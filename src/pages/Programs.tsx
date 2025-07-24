import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  MapPin,
  Calendar,
  Target,
  DollarSign
} from 'lucide-react';
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import environmentImage from '@/assets/environment-program.jpg';

const Programs = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Education', 'Healthcare', 'Environment', 'Community Development'];

  const programs = [
    {
      id: 1,
      title: 'Rural Education Initiative',
      description: 'Building schools and training teachers in remote communities to ensure every child has access to quality education.',
      image: educationImage,
      category: 'Education',
      impact: '500+ Students',
      location: 'Guatemala, Honduras',
      duration: 'Ongoing since 2018',
      budget: '$125,000',
      status: 'Active',
      goals: [
        'Build 5 new schools in remote areas',
        'Train 25 local teachers',
        'Provide learning materials for 500 students',
        'Establish community libraries'
      ]
    },
    {
      id: 2,
      title: 'Mobile Health Clinics',
      description: 'Bringing essential healthcare services directly to underserved communities through mobile medical units.',
      image: healthcareImage,
      category: 'Healthcare',
      impact: '2,000+ Patients',
      location: 'Nigeria, Kenya',
      duration: '2020-2025',
      budget: '$180,000',
      status: 'Active',
      goals: [
        'Operate 6 mobile clinics',
        'Train 15 community health workers',
        'Provide preventive care to 3,000 people',
        'Conduct health education workshops'
      ]
    },
    {
      id: 3,
      title: 'Reforestation & Conservation',
      description: 'Protecting biodiversity and combating climate change through community-led reforestation and conservation efforts.',
      image: environmentImage,
      category: 'Environment',
      impact: '10,000+ Trees',
      location: 'India, Nepal, Madagascar',
      duration: '2019-2024',
      budget: '$95,000',
      status: 'Active',
      goals: [
        'Plant 15,000 native trees',
        'Establish 5 protected areas',
        'Train local conservation teams',
        'Develop sustainable tourism'
      ]
    },
    {
      id: 4,
      title: 'Clean Water Access',
      description: 'Installing water wells and purification systems to provide safe, clean drinking water to rural communities.',
      image: educationImage, // Using placeholder
      category: 'Community Development',
      impact: '1,500+ People',
      location: 'Ethiopia, Tanzania',
      duration: '2021-2024',
      budget: '$200,000',
      status: 'Active',
      goals: [
        'Install 20 water wells',
        'Build water purification systems',
        'Train maintenance teams',
        'Educate on water hygiene'
      ]
    },
    {
      id: 5,
      title: 'Women\'s Literacy Program',
      description: 'Empowering women through literacy training and vocational skills development for economic independence.',
      image: healthcareImage, // Using placeholder
      category: 'Education',
      impact: '300+ Women',
      location: 'Bangladesh, Pakistan',
      duration: '2022-2025',
      budget: '$75,000',
      status: 'Active',
      goals: [
        'Teach literacy to 400 women',
        'Provide vocational training',
        'Support micro-enterprises',
        'Create women\'s cooperatives'
      ]
    },
    {
      id: 6,
      title: 'Maternal Health Support',
      description: 'Reducing maternal and infant mortality through prenatal care, safe delivery, and postnatal support services.',
      image: environmentImage, // Using placeholder
      category: 'Healthcare',
      impact: '800+ Mothers',
      location: 'Sierra Leone, Liberia',
      duration: '2020-2024',
      budget: '$150,000',
      status: 'Active',
      goals: [
        'Provide prenatal care to 1,000 mothers',
        'Train traditional birth attendants',
        'Establish birthing centers',
        'Distribute nutrition supplements'
      ]
    }
  ];

  const filteredPrograms = programs.filter(program => {
    const matchesCategory = activeFilter === 'All' || program.category === activeFilter;
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryStats = categories.slice(1).map(category => {
    const categoryPrograms = programs.filter(p => p.category === category);
    return {
      name: category,
      count: categoryPrograms.length,
      totalBudget: categoryPrograms.reduce((sum, p) => sum + parseInt(p.budget.replace(/[$,]/g, '')), 0),
      totalImpact: categoryPrograms.reduce((sum, p) => {
        const impact = parseInt(p.impact.replace(/[^0-9]/g, ''));
        return sum + impact;
      }, 0)
    };
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our Programs
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Comprehensive Solutions for
              <span className="block text-primary">Lasting Change</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Explore our diverse portfolio of programs designed to address the root causes of poverty 
              and create sustainable pathways to prosperity in communities worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Program Statistics */}
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
                    <p className="text-sm text-muted-foreground">Active Programs</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search programs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-muted-foreground">
              Showing {filteredPrograms.length} of {programs.length} programs
              {activeFilter !== 'All' && ` in ${activeFilter}`}
            </p>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          {filteredPrograms.length === 0 ? (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">No programs found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filter settings.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program) => (
                <ProgramCard
                  key={program.id}
                  title={program.title}
                  description={program.description}
                  image={program.image}
                  category={program.category}
                  impact={program.impact}
                  href={`/programs/${program.id}`}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Program Detail */}
      {filteredPrograms.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                Featured Program
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Take a closer look at one of our flagship programs and see how your support creates lasting impact.
              </p>
            </div>

            <Card className="max-w-5xl mx-auto shadow-strong">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative">
                  <img
                    src={programs[0].image}
                    alt={programs[0].title}
                    className="w-full h-full object-cover rounded-l-lg"
                  />
                  <Badge
                    variant="secondary"
                    className="absolute top-4 left-4 bg-white/90 text-secondary"
                  >
                    {programs[0].status}
                  </Badge>
                </div>
                
                <div className="p-8">
                  <CardHeader className="p-0 mb-6">
                    <CardTitle className="text-2xl font-heading mb-2">
                      {programs[0].title}
                    </CardTitle>
                    <p className="text-muted-foreground leading-relaxed">
                      {programs[0].description}
                    </p>
                  </CardHeader>

                  <div className="space-y-6">
                    {/* Program Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{programs[0].location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{programs[0].duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{programs[0].impact}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">{programs[0].budget}</span>
                      </div>
                    </div>

                    {/* Goals */}
                    <div>
                      <h4 className="font-semibold mb-3">Program Goals:</h4>
                      <ul className="space-y-2">
                        {programs[0].goals.map((goal, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="default" className="flex-1">
                        Support This Program
                      </Button>
                      <Button variant="outline" className="flex-1">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <Target className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Support a Project Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Choose a program that resonates with your values and make a direct impact on the lives 
            of people who need it most. Every contribution, no matter the size, creates lasting change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
              Donate Now
            </Button>
            <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-secondary">
              Become a Monthly Supporter
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;