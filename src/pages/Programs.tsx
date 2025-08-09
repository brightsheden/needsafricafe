import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import ProgramCard from '@/components/Shared/ProgramCard';
import { 
  Search, 
  Filter, 
  GraduationCap, 
  Heart, 
  Leaf, 
  Users,
  Target
} from 'lucide-react';
import { useProjects } from '@/api/projects';
import { API_URL } from "../../config";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('active'); // New: 'active' or 'completed'
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const categories = ['All', 'Education', 'Healthcare', 'Community Development'];

  const { data, isLoading, isError } = useProjects({
    search: searchTerm,
    category: activeFilter !== 'All' ? activeFilter.toLowerCase() : '',
    status: statusFilter, // Pass new filter
    page,
    page_size: pageSize
  });

  const projects = data?.data || [];
  const total = data?.total || 0;
  const totalPages = data?.total_pages || 1;

  const categoryStats = categories.slice(1).map(category => {
    const categoryProjects = projects.filter(p => p.category === category.toLowerCase());
    return {
      name: category,
      count: categoryProjects.length,
      totalBudget: categoryProjects.reduce((sum, p) => sum + parseInt(p.target_amount.replace(/[$,]/g, '')), 0),
      totalImpact: 0
    };
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our Projects
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Comprehensive Solutions for
              <span className="block text-primary">Educational and Health Change</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore our diverse portfolio of projects designed to address the root causes of poverty 
              and create sustainable pathways to prosperity in communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {isLoading && (
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Project Statistics */}
      <section className="py-16 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryStats.map((stat, index) => (
              <Card key={index} className="text-center shadow-medium hover:shadow-strong transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4">
                    {stat.name === 'Education' && <GraduationCap className="h-8 w-8 mx-auto text-primary" />}
                    {stat.name === 'Healthcare' && <Heart className="h-8 w-8 mx-auto text-primary" />}
                    {stat.name === 'Environment' && <Leaf className="h-8 w-8 mx-auto text-primary" />}
                    {stat.name === 'Community Development' && <Users className="h-8 w-8 mx-auto text-primary" />}
                  </div>
                  <h3 className="text-lg font-bold font-heading mb-2">{stat.name}</h3>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-primary">{stat.count}</p>
                    <p className="text-sm text-muted-foreground">Active Projects</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search, Filter & Status Tabs */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6 space-y-4">
          {/* Status Tabs */}
          <div className="flex justify-center gap-4">
            <Button
              variant={statusFilter === 'active' ? "default" : "outline"}
              onClick={() => { setStatusFilter('active'); setPage(1); }}
            >
              Active Projects
            </Button>
            <Button
              variant={statusFilter === 'completed' ? "default" : "outline"}
              onClick={() => { setStatusFilter('completed'); setPage(1); }}
            >
              Completed Projects
            </Button>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => { setActiveFilter(category); setPage(1); }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground">
              Showing {projects.length} of {total} projects
              {activeFilter !== 'All' && ` in ${activeFilter}`}
              {statusFilter && ` (${statusFilter})`}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">No projects found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter settings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProgramCard
                  key={project.id}
                  title={project.title}
                  description={project.summary}
                  image={`${API_URL}${project.cover_image}`}
                  category={project.category}
                  impact={project.impact}
                  href={`/projects/${project.id}`}
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span className="px-4 py-2 text-muted-foreground">Page {page} of {totalPages}</span>
              <Button
                variant="outline"
                size="sm"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <Target className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Support a Project Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Choose a project that resonates with your values and make a direct impact on the lives 
            of people who need it most. Every contribution, no matter the size, creates lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
              Donate Now
            </Button>
            <Button variant="outline" size="xl" className="text-primary border-white hover:bg-white hover:text-secondary">
              Become a Monthly Supporter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
