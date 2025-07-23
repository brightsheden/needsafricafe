import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ImpactStat {
  number: number;
  label: string;
  suffix?: string;
}

const ImpactCounter = ({ stats }: { stats: ImpactStat[] }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact-counters');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      if (!animated) return;

      const increment = target / 100;
      const timer = setInterval(() => {
        setCurrent((prev) => {
          if (prev >= target) {
            clearInterval(timer);
            return target;
          }
          return Math.min(prev + increment, target);
        });
      }, 20);

      return () => clearInterval(timer);
    }, [animated, target]);

    return (
      <span className="font-bold text-3xl md:text-4xl lg:text-5xl text-primary animate-counter">
        {Math.floor(current).toLocaleString()}
        {suffix}
      </span>
    );
  };

  return (
    <section id="impact-counters" className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every number represents a life touched, a community strengthened, and hope restored.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-gradient-card border-0 shadow-medium hover:shadow-strong transition-all duration-300 group">
              <CardContent className="pt-8 pb-6">
                <div className="mb-4">
                  <AnimatedNumber target={stat.number} suffix={stat.suffix} />
                </div>
                <p className="text-lg font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactCounter;