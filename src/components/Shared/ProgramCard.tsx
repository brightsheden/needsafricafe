import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  category: string;
  impact: string;
  href?: string;
  variant?: 'default' | 'featured';
}

const ProgramCard = ({ 
  title, 
  description, 
  image, 
  category, 
  impact, 
  href = "#",
  variant = 'default' 
}: ProgramCardProps) => {
  const cardClass = variant === 'featured' 
    ? "group hover:shadow-strong transition-all duration-300 border-2 border-primary/20 hover:border-primary/40" 
    : "group hover:shadow-medium transition-all duration-300";

  return (
    <Card className={cardClass}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-white/90 text-secondary font-medium">
              {category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <h3 className="text-xl font-bold font-heading mb-3 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-primary border-primary/30">
            {impact}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
          asChild
        >
          <a href={href} className="flex items-center justify-center space-x-2">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProgramCard;