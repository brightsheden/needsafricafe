import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ImpactCounter from '@/components/Shared/ImpactCounter';
import { 
  Download, 
  TrendingUp, 
  Users, 
  GraduationCap, 
  Heart, 
  Leaf,
  Quote,
  MapPin,
  Calendar
} from 'lucide-react';
import impactImage from '@/assets/impact-transformation.jpg';

const Impact = () => {
  const impactStats = [
    { number: 15247, label: 'Lives Directly Impacted', suffix: '+' },
    { number: 127, label: 'Completed Projects' },
    { number: 45, label: 'Active Communities' },
    { number: 12, label: 'Countries Served' },
    { number: 856, label: 'Students Graduated' },
    { number: 32, label: 'Schools Built' },
    { number: 10000, label: 'Trees Planted', suffix: '+' },
    { number: 98, label: 'Sustainability Rate', suffix: '%' },
  ];

  const programMetrics = [
    {
      category: 'Education',
      icon: GraduationCap,
      metrics: [
        { label: 'Schools Built', value: '32' },
        { label: 'Students Enrolled', value: '2,450' },
        { label: 'Teachers Trained', value: '156' },
        { label: 'Literacy Rate Increase', value: '85%' }
      ],
      color: 'primary'
    },
    {
      category: 'Healthcare',
      icon: Heart,
      metrics: [
        { label: 'Patients Treated', value: '18,500+' },
        { label: 'Health Workers Trained', value: '89' },
        { label: 'Mobile Clinics Operating', value: '12' },
        { label: 'Vaccination Coverage', value: '92%' }
      ],
      color: 'secondary'
    },
    {
      category: 'Environment',
      icon: Leaf,
      metrics: [
        { label: 'Trees Planted', value: '10,000+' },
        { label: 'Clean Water Points', value: '67' },
        { label: 'Farming Cooperatives', value: '23' },
        { label: 'Carbon Offset (tons)', value: '450' }
      ],
      color: 'primary'
    }
  ];

  const testimonials = [
    {
      quote: "Before HopeBridge, our children had to walk 3 hours to reach the nearest school. Now we have our own school with qualified teachers, and our literacy rate has increased from 30% to 85% in just 4 years.",
      author: "Maria Gonzalez",
      role: "Community Leader",
      location: "Guatemala",
      date: "2024"
    },
    {
      quote: "The mobile health clinic saved my daughter's life. When she fell seriously ill with malaria, the HopeBridge health workers were there within hours. Today, she's a healthy 8-year-old who dreams of becoming a doctor.",
      author: "James Okonkwo",
      role: "Father & Farmer",
      location: "Nigeria",
      date: "2023"
    },
    {
      quote: "Our sustainable farming program has transformed our entire region. We've tripled our crop yields while protecting our soil and water sources. Young people are staying in the village instead of migrating to cities.",
      author: "Priya Sharma",
      role: "Agricultural Coordinator",
      location: "India",
      date: "2024"
    }
  ];

  const reportData = [
    {
      title: "2023 Annual Impact Report",
      description: "Comprehensive overview of our programs, financials, and community outcomes",
      pages: "48 pages",
      date: "March 2024"
    },
    {
      title: "Education Program Evaluation",
      description: "Independent assessment of our education initiatives across 12 communities",
      pages: "24 pages",
      date: "January 2024"
    },
    {
      title: "Environmental Impact Study",
      description: "Detailed analysis of our reforestation and conservation efforts",
      pages: "32 pages",
      date: "November 2023"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Our Impact
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6">
              Measuring What Matters
            </h1>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Transparency and accountability are at the heart of everything we do. Explore the real, 
              measurable impact we're creating together in communities around the world.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <ImpactCounter stats={impactStats} />

      {/* Before & After Transformation */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Transformation in Action
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See the remarkable changes that occur when communities have access to education, 
              healthcare, and sustainable development opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={impactImage}
                alt="Community transformation before and after"
                className="rounded-lg shadow-strong w-full"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-heading">
                San Miguel, Guatemala - 2020 to 2024
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">School Attendance</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground line-through">45%</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Access to Clean Water</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground line-through">12%</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">95%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Household Income</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground line-through">$820/year</span>
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span className="font-bold text-green-600">$2,400/year</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <span className="font-medium">Child Malnutrition</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground line-through">38%</span>
                    <TrendingUp className="h-4 w-4 text-green-600 transform rotate-180" />
                    <span className="font-bold text-green-600">8%</span>
                  </div>
                </div>
              </div>
              
              <Button variant="default" size="lg">
                Read Full Case Study
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Program Metrics */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Program Performance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Detailed metrics from each of our core program areas, showing the depth and breadth of our impact.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {programMetrics.map((program, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 rounded-full bg-primary/10">
                      <program.icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-heading">{program.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {program.metrics.map((metric, metricIndex) => (
                      <div key={metricIndex} className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">{metric.label}</span>
                        <span className="font-bold text-lg">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Voices from the Field
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The most powerful measure of our impact comes from the people whose lives have been transformed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-primary mb-6" />
                  
                  <p className="text-lg leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold">{testimonial.author}</p>
                        <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-muted-foreground text-sm mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {testimonial.location}
                        </div>
                        <div className="flex items-center text-muted-foreground text-sm">
                          <Calendar className="h-3 w-3 mr-1" />
                          {testimonial.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Reports & Downloads */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Transparency Reports
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Access our detailed impact reports, financial statements, and independent evaluations. 
              We believe in complete transparency about how your donations create change.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reportData.map((report, index) => (
              <Card key={index} className="shadow-medium hover:shadow-strong transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <Download className="h-8 w-8 text-primary flex-shrink-0" />
                    <Badge variant="secondary" className="text-xs">
                      {report.date}
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-bold font-heading mb-3">
                    {report.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {report.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{report.pages}</span>
                    <Button variant="outline" size="sm">
                      Download PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="default" size="lg">
              View All Reports
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-impact text-white">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <Users className="h-16 w-16 mx-auto mb-6 text-primary" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Your Impact Starts Today
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto text-white/90">
            Every donation, every volunteer hour, every shared story contributes to the impact you see here. 
            Join us in writing the next chapter of positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="xl" className="bg-primary hover:bg-primary/90">
              Make Your Impact
            </Button>
            <Button variant="outline" size="xl" className="text-white border-white hover:bg-white hover:text-secondary">
              Get Updates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;