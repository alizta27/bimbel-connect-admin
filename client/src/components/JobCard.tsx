import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, MapPin, Clock, Building2 } from "lucide-react";
import { Link } from "wouter";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  tokenCost: number;
  description: string;
  skills: string[];
  postedAt: string;
  budget?: string;
  category: string;
}

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  const timeAgo = (date: string) => {
    const now = new Date();
    const posted = new Date(date);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  return (
    <Card className="hover-elevate transition-all duration-200 hover:shadow-lg" data-testid={`card-job-${job.id}`}>
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs font-semibold">
                {job.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{timeAgo(job.postedAt)}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-foreground leading-tight" data-testid={`text-job-title-${job.id}`}>
              {job.title}
            </h3>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                <span>{job.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-accent/20 px-3 py-2 rounded-full border border-accent" data-testid={`display-token-cost-${job.id}`}>
            <Coins className="w-4 h-4 text-accent-foreground" />
            <span className="font-bold text-accent-foreground">{job.tokenCost}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} lainnya
            </Badge>
          )}
        </div>

        {job.budget && (
          <div className="text-sm font-semibold text-primary">
            Budget: {job.budget}
          </div>
        )}

        <div className="pt-2">
          <Link href={`/jobs/${job.id}`}>
            <a className="w-full block" data-testid={`button-view-job-${job.id}`}>
              <Button className="w-full" variant="default">
                Lihat Detail
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </Card>
  );
}
