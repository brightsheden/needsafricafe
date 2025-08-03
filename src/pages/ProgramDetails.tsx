import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import DonationForm from '@/components/Shared/DonationForm';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Target,
  DollarSign,
  Users,
  CheckCircle,
  Share2,
  Heart,
  Download
} from 'lucide-react';

import { useProject } from '@/api/projects';
import { API_URL } from '../../config';

const ProgramDetails = () => {
  const { id } = useParams();
  const projectId = Number(id);
  const { data, isLoading, isError } = useProject(projectId);
  const program = data?.data;

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Program Not Found</h1>
          <Link to="/programs">
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`${API_URL}${program.cover_image}`}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <Link to="/projects" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Link>

            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              {program?.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {program.title}
            </h1>

            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              {program.summary}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {program.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {program.deadline}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-3xl font-bold font-heading mb-6">Program Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {program.summary}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary mb-1">{program.currency} {program.target_amount}</div>
                      <div className="text-sm text-muted-foreground">Total Budget</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Share Section */}
              <div className="pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-2">Share This Program</h4>
                    <p className="text-sm text-muted-foreground">Help us spread awareness about this important work</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Progress Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    Funding Progress
                    <Badge variant={program.status === 'Active' ? 'default' : 'secondary'}>
                      {program.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Raised: {program.currency} {program.amount_raised}</span>
                      <span>{program.percentage_funded.toFixed(2)}%</span>
                    </div>
                    <Progress value={program.percentage_funded} className="h-3" />
                    <div className="text-sm text-muted-foreground mt-2">
                      Goal: {program.currency} {program.target_amount}
                    </div>
                  </div>

                  <Separator />

                  {/* <div className="space-y-3">
                    <h4 className="font-semibold">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="default" className="w-full">
                        <Heart className="h-4 w-4 mr-2" />
                        Support This Program
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                    </div>
                  </div> */}
                </CardContent>
              </Card>

              {/* Donation Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Support This Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonationForm projectId={projectId} />
                </CardContent>
              </Card>

              {/* Program Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Program Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Location</div>
                      <div className="text-sm text-muted-foreground">{program.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">End Date</div>
                      <div className="text-sm text-muted-foreground">{program.deadline}</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Category</div>
                      <div className="text-sm text-muted-foreground">{program.category}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetails;
