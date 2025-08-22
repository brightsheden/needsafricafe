import React, { useEffect, useState } from 'react';
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
  Share2,
  User,
  Users,
  CheckCircle
} from 'lucide-react';
import { useProject } from '@/api/projects';
import { API_URL } from '../../config';
import { error } from 'console';
import { formatCurrency, capitalize } from '@/lib/utils';

const ProgramDetails = () => {
  const { id } = useParams();
  const projectId = Number(id);
  const { data, isPending, isError, error } = useProject(projectId);
  const program = data?.data;

  const photos = program?.photos?.filter((p) => p.image) || [];
  const [mainImage, setMainImage] = useState(null);
  const [mainName, setMainName] = useState('');
  const [mainDate, setMainDate] = useState('');
  const [animateMainImage, setAnimateMainImage] = useState(false);

  // share status: 'idle' | 'sharing' | 'shared' | 'copied' | 'failed'
  const [shareStatus, setShareStatus] = useState('idle');

  useEffect(() => {
    if (photos.length > 0 && !mainImage) {
      setMainImage(photos[0].image);
      setMainName(photos[0].name);
      setMainDate(photos[0].deliver_date);
    }
  }, [photos, mainImage]);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareData = {
      title: program?.title ?? 'Program',
      text: program?.summary ?? '',
      url: shareUrl,
    };

    setShareStatus('sharing');

    try {
      if (navigator.share) {
        // Native share
        await navigator.share(shareData);
        setShareStatus('shared');
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        // Copy to clipboard (modern)
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus('copied');
      } else {
        // Legacy fallback
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        setShareStatus(successful ? 'copied' : 'failed');
      }
    } catch (err) {
      console.error('Share failed:', err);
      setShareStatus('failed');
    } finally {
      // reset after a short delay so the UI message disappears
      setTimeout(() => setShareStatus('idle'), 3000);
    }
  };

  if (isPending) {
    return (
      <div className=" flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center justify-center">
          <div className="card ">{error?.message || 'An error occurred'}</div>
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
            src={`${API_URL}${program?.cover_image}`}
            alt={program?.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 container mx-auto max-w-7xl px-6 h-full flex items-center">
          <div className="text-white max-w-4xl">
            <Link
              to="/projects"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Programs
            </Link>

            <Badge
              variant="secondary"
              className="mx-4 mb-4 bg-white/20 text-white border-white/30"
            >
              {program?.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
              {program?.title}
            </h1>

            <p className="text-xl text-white/90 mb-6 leading-relaxed">
              {program?.summary}
            </p>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                {program?.location}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {program?.deadline}
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
                <h2 className="text-3xl font-bold font-heading mb-6">
                  Program Overview
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  {program?.summary}
                </p>

                {/* Key Metrics */}
                <div className="">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="p-2 border shadow-md flex flex-col items-center justify-center w-full rounded-md">
                      <p className="text-2xl font-bold text-primary leading-relaxed flex justify-between flex-col items-center">
                        <Target className="size-8" />
                        {program?.impact_phrase}
                      </p>
                      <span className="text-muted-foreground">Direct impact </span>
                    </div>

                   <div className='p-2 border shadow-md flex flex-col items-center justify-center w-full rounded-md'>
                    <p className="text-2xl font-bold text-primary leading-relaxed  flex justify-between flex-col items-center">
                    <DollarSign className='size-8'/>
                   {formatCurrency(program?.target_amount)}
                  </p>
                  <span className='text-muted-foreground'>Total budget </span>
                  </div>

                    <div className="p-2 border shadow-md flex flex-col items-center justify-center w-full rounded-md">
                      <p className="text-2xl font-bold text-primary leading-relaxed flex justify-between flex-col items-center">
                        <Users className="size-8" />
                        { formatCurrency(program?.beneficiary_count)}
                      </p>
                      <span className="text-muted-foreground">Total beneficiaries </span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Program Goals */}
              {program?.goals?.length > 0 && (
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
              )}

              {/* Achievements */}
              {program?.milestones?.length > 0 && (
                <div className="transition-all duration-1000 delay-500">
                  <h3 className="text-2xl font-bold font-heading mb-6">Key Achievements</h3>
                  <div className="space-y-4">
                    {program.milestones.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Separator />

              {/* Proof of Delivery Section */}
              {photos?.length > 0 && (
                <div>
                  <h4 className="text-2xl font-bold font-heading mb-6">Proof of delivery</h4>
                  <div className="space-y-4">
                    {/* Main Image */}
                    {mainImage && (
                      <img
                        src={`${API_URL}${mainImage}`}
                        alt="Proof of Delivery"
                        className={`w-[800px] h-[500px] mx-auto rounded-lg object-cover transition-transform duration-300 ${
                          animateMainImage ? 'scale-105 opacity-0' : 'scale-100 opacity-100'
                        }`}
                      />
                    )}
                    {/* Recipient Info */}
                    <div className="text-center mt-2">
                      <p className="text-lg font-semibold">
                        Recipient: {mainName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Date of Delivery:{' '}
                        {mainDate ? new Date(mainDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>

                    {/* Thumbnails */}
                    <div className="flex gap-2 overflow-x-auto pt-2">
                      {photos.map((photo, idx) => (
                        <img
                          key={idx}
                          src={`${API_URL}${photo.image}`}
                          alt={`Thumbnail ${idx + 1}`}
                          className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                            mainImage === photo.image ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => {
                            setAnimateMainImage(true);
                            setMainImage(photo.image);
                            setMainName(photo.name);
                            setMainDate(photo.deliver_date);
                            setTimeout(() => setAnimateMainImage(false), 300);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="pt-8 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold mb-2">Share This Program</h4>
                    <p className="text-sm text-muted-foreground">
                      Help us spread awareness about this important work
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      disabled={!program}
                      aria-disabled={!program}
                      aria-label="Share this program"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>

                    {/* ephemeral feedback */}
                    <div aria-live="polite" className="min-w-[120px] text-sm">
                      {shareStatus === 'sharing' && <span className="text-muted-foreground">Sharing…</span>}
                      {shareStatus === 'shared' && <span className="text-green-600">Shared — thanks!</span>}
                      {shareStatus === 'copied' && <span className="text-green-600">Link copied</span>}
                      {shareStatus === 'failed' && <span className="text-red-600">Share failed</span>}
                    </div>
                  </div>
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
                    <Badge
                      variant={program?.status === 'Active' ? 'default' : 'secondary'}
                    >
                      {program?.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>
                        Raised: {program?.currency} {formatCurrency(program?.amount_raised)}
                      </span>
                      <span>{program?.percentage_funded?.toFixed(2)}%</span>
                    </div>
                    <Progress
                      value={program?.percentage_funded}
                      className="h-3"
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      Goal: {program?.currency} {formatCurrency(program?.target_amount)}
                    </div>
                  </div>
                  <Separator />
                  {program?.donation_reason && (
                    <div>
                      <CardTitle> Reason for Donation Continuation</CardTitle>
                      <span className="text-sm">{program?.donation_reason}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Donation Form */}
              {program?.receiving_donation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Support This Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DonationForm projectId={projectId} />
                  </CardContent>
                </Card>
              )}

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
                      <div className="text-sm text-muted-foreground">
                        {program?.location}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">End Date</div>
                      <div className="text-sm text-muted-foreground">
                        {program?.deadline}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <div className="font-medium">Category</div>
                      <div className="text-sm text-muted-foreground">
                        {capitalize(program?.category)}
                      </div>
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
