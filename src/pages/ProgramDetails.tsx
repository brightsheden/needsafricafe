import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import DonationForm from '@/components/Shared/DonationForm';
import useScrollAnimation from '@/hooks/useScrollAnimation';
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
import educationImage from '@/assets/education-program.jpg';
import healthcareImage from '@/assets/healthcare-program.jpg';
import environmentImage from '@/assets/environment-program.jpg';

const ProgramDetails = () => {
  const { id } = useParams();
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: detailsRef, isVisible: detailsVisible } = useScrollAnimation();
  const { ref: progressRef, isVisible: progressVisible } = useScrollAnimation();
  const { ref: donationRef, isVisible: donationVisible } = useScrollAnimation();

  // Program data (in a real app, this would come from an API)
  const programs = [
    {
      id: 1,
      title: 'Rural Education Initiative',
      description: 'Building schools and training teachers in remote communities to ensure every child has access to quality education.',
      fullDescription: 'Our Rural Education Initiative addresses the critical gap in educational access for children living in remote and underserved communities. Through this comprehensive program, we establish sustainable educational infrastructure, train local teachers, and provide essential learning materials. Our approach emphasizes community involvement and long-term sustainability, ensuring that the impact extends far beyond our direct intervention.',
      image: educationImage,
      category: 'Education',
      impact: '500+ Students',
      location: 'Guatemala, Honduras',
      duration: 'Ongoing since 2018',
      budget: '$125,000',
      raised: '$95,000',
      status: 'Active',
      progress: 76,
      beneficiaries: 524,
      goals: [
        'Build 5 new schools in remote areas',
        'Train 25 local teachers',
        'Provide learning materials for 500 students',
        'Establish community libraries'
      ],
      achievements: [
        'Completed 3 schools serving 300+ children',
        'Trained 18 local teachers and education coordinators',
        'Distributed 2,000+ textbooks and learning materials',
        'Established 2 community libraries with 500+ books each'
      ],
      challenges: [
        'Remote locations make transportation of materials difficult',
        'Limited local infrastructure requires creative solutions',
        'Teacher retention in rural areas needs ongoing support'
      ],
      nextSteps: [
        'Complete construction of remaining 2 schools by Q3 2024',
        'Launch mobile library program for isolated communities',
        'Develop teacher mentorship network'
      ]
    },
    {
      id: 2,
      title: 'Mobile Health Clinics',
      description: 'Bringing essential healthcare services directly to underserved communities through mobile medical units.',
      fullDescription: 'Our Mobile Health Clinics program brings comprehensive healthcare directly to remote and underserved communities that lack access to traditional medical facilities. Each mobile unit is equipped with essential medical equipment and staffed by qualified healthcare professionals who provide preventive care, basic treatment, health education, and emergency services.',
      image: healthcareImage,
      category: 'Healthcare',
      impact: '2,000+ Patients',
      location: 'Nigeria, Kenya',
      duration: '2020-2025',
      budget: '$180,000',
      raised: '$142,000',
      status: 'Active',
      progress: 79,
      beneficiaries: 2156,
      goals: [
        'Operate 6 mobile clinics',
        'Train 15 community health workers',
        'Provide preventive care to 3,000 people',
        'Conduct health education workshops'
      ],
      achievements: [
        'Successfully deployed 4 mobile clinics',
        'Trained 12 community health workers',
        'Provided care to over 2,000 patients',
        'Conducted 150+ health education sessions'
      ],
      challenges: [
        'Fuel costs and vehicle maintenance in remote areas',
        'Limited medical supplies in challenging logistics',
        'Language barriers in diverse communities'
      ],
      nextSteps: [
        'Deploy 2 additional mobile units',
        'Establish telemedicine capabilities',
        'Create community health champion program'
      ]
    },
    {
      id: 3,
      title: 'Reforestation & Conservation',
      description: 'Protecting biodiversity and combating climate change through community-led reforestation and conservation efforts.',
      fullDescription: 'Our Reforestation & Conservation program works with local communities to restore degraded ecosystems, protect biodiversity, and combat climate change. Through scientific reforestation techniques, community education, and sustainable livelihood development, we create lasting environmental and economic benefits for participating communities.',
      image: environmentImage,
      category: 'Environment',
      impact: '10,000+ Trees',
      location: 'India, Nepal, Madagascar',
      duration: '2019-2024',
      budget: '$95,000',
      raised: '$78,000',
      status: 'Active',
      progress: 82,
      beneficiaries: 850,
      goals: [
        'Plant 15,000 native trees',
        'Establish 5 protected areas',
        'Train local conservation teams',
        'Develop sustainable tourism'
      ],
      achievements: [
        'Planted 12,300 native trees with 85% survival rate',
        'Established 3 protected conservation areas',
        'Trained 45 local conservation team members',
        'Created 2 eco-tourism initiatives'
      ],
      challenges: [
        'Climate change affecting seedling survival rates',
        'Need for long-term community engagement',
        'Balancing conservation with livelihood needs'
      ],
      nextSteps: [
        'Complete planting of remaining 2,700 trees',
        'Establish final 2 protected areas',
        'Launch carbon credit program for communities'
      ]
    }
  ];

  const program = programs.find(p => p.id === parseInt(id || '0'));

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
            src={program.image}
            alt={program.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div 
          ref={heroRef}
          className={`relative z-10 container mx-auto max-w-7xl px-6 h-full flex items-center transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-white max-w-4xl">
            <Link to="/programs" className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Link>
            
            <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
              {program.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {program.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              {program.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {program.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {program.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {program.beneficiaries.toLocaleString()} Beneficiaries
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
              <div 
                ref={detailsRef}
                className={`transition-all duration-1000 delay-200 ${
                  detailsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <h2 className="text-3xl font-bold font-heading mb-6">Program Overview</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {program.fullDescription}
                </p>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <Target className="h-8 w-8 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary mb-1">{program.impact}</div>
                      <div className="text-sm text-muted-foreground">Direct Impact</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <DollarSign className="h-8 w-8 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary mb-1">{program.budget}</div>
                      <div className="text-sm text-muted-foreground">Total Budget</div>
                    </CardContent>
                  </Card>
                  
                  <Card className="text-center">
                    <CardContent className="p-6">
                      <Users className="h-8 w-8 mx-auto text-primary mb-2" />
                      <div className="text-2xl font-bold text-primary mb-1">{program.beneficiaries.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Beneficiaries</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Program Goals */}
              <div className="transition-all duration-1000 delay-400">
                <h3 className="text-2xl font-bold font-heading mb-6">Program Goals</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {program.goals.map((goal, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-muted/30 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{goal}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="transition-all duration-1000 delay-500">
                <h3 className="text-2xl font-bold font-heading mb-6">Key Achievements</h3>
                <div className="space-y-4">
                  {program.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{achievement}</span>
                    </div>
                  ))}
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
              <Card 
                ref={progressRef}
                className={`transition-all duration-1000 delay-300 ${
                  progressVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
              >
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
                      <span>Raised: {program.raised}</span>
                      <span>{program.progress}%</span>
                    </div>
                    <Progress value={program.progress} className="h-3" />
                    <div className="text-sm text-muted-foreground mt-2">
                      Goal: {program.budget}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
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
                  </div>
                </CardContent>
              </Card>

              {/* Donation Form */}
              <Card 
                ref={donationRef}
                className={`transition-all duration-1000 delay-500 ${
                  donationVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <CardHeader>
                  <CardTitle>Support This Program</CardTitle>
                </CardHeader>
                <CardContent>
                  <DonationForm />
                </CardContent>
              </Card>

              {/* Program Info */}
              <Card className="transition-all duration-1000 delay-600">
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
                      <div className="font-medium">Duration</div>
                      <div className="text-sm text-muted-foreground">{program.duration}</div>
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