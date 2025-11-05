import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StatsCard from "@/components/StatsCard";
import JobCard from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, FileText, Coins, TrendingUp, Eye } from "lucide-react";
import type { Job } from "@/components/JobCard";
import { authService } from "@/lib/auth";

//todo: remove mock functionality
const MOCK_APPLIED_JOBS: Job[] = [
  {
    id: "1",
    title: "Desainer UI/UX untuk Aplikasi Mobile E-Commerce",
    company: "TechStart Indonesia",
    location: "Jakarta, Remote",
    tokenCost: 3,
    description: "Kami mencari desainer UI/UX berpengalaman untuk merancang aplikasi mobile e-commerce.",
    skills: ["Figma", "UI Design", "UX Research"],
    postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 5.000.000 - Rp 8.000.000",
    category: "Design"
  },
  {
    id: "2",
    title: "Full Stack Developer - Platform Edukasi Online",
    company: "EduTech Nusantara",
    location: "Bandung, Hybrid",
    tokenCost: 5,
    description: "Dibutuhkan full stack developer untuk membangun platform edukasi online.",
    skills: ["React", "Node.js", "PostgreSQL"],
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 15.000.000 - Rp 25.000.000",
    category: "Programming"
  },
];

//todo: remove mock functionality
const MOCK_APPLICATIONS = [
  {
    id: "1",
    jobTitle: "Desainer UI/UX untuk Aplikasi Mobile E-Commerce",
    company: "TechStart Indonesia",
    appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "pending" as const,
    proposedRate: "Rp 7.000.000",
  },
  {
    id: "2",
    jobTitle: "Full Stack Developer - Platform Edukasi Online",
    company: "EduTech Nusantara",
    appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: "accepted" as const,
    proposedRate: "Rp 20.000.000",
  },
  {
    id: "3",
    jobTitle: "Content Writer Bahasa Indonesia",
    company: "Wanderlust Media",
    appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "rejected" as const,
    proposedRate: "Rp 3.500.000",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      pending: { label: "Menunggu", variant: "secondary" },
      accepted: { label: "Diterima", variant: "default" },
      rejected: { label: "Ditolak", variant: "destructive" },
    };
    
    const config = variants[status] || variants.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const applied = new Date(date);
    const diffInDays = Math.floor((now.getTime() - applied.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Hari ini";
    if (diffInDays === 1) return "Kemarin";
    return `${diffInDays} hari yang lalu`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userRole={currentUser?.role || null}
        tokenBalance={currentUser?.tokenBalance}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard {currentUser?.role === "employer" ? "Employer" : "Freelancer"}
          </h1>
          <p className="text-muted-foreground">Selamat datang kembali, {currentUser?.name || "User"}!</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="applications" data-testid="tab-applications">Lamaran Saya</TabsTrigger>
            <TabsTrigger value="saved" data-testid="tab-saved">Tersimpan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Lamaran"
                value={MOCK_APPLICATIONS.length}
                icon={FileText}
                description="Bulan ini"
                trend={{ value: 25, isPositive: true }}
              />
              <StatsCard
                title="Diterima"
                value={MOCK_APPLICATIONS.filter(a => a.status === "accepted").length}
                icon={Briefcase}
                description="Proyek aktif"
              />
              <StatsCard
                title="Saldo Token"
                value={currentUser?.tokenBalance || 0}
                icon={Coins}
                description="Token tersedia"
              />
              <StatsCard
                title="Profile Views"
                value={147}
                icon={Eye}
                description="7 hari terakhir"
                trend={{ value: 12, isPositive: true }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Lamaran Terbaru</h3>
                <div className="space-y-4">
                  {MOCK_APPLICATIONS.slice(0, 3).map((application) => (
                    <div key={application.id} className="flex items-start justify-between gap-4 pb-4 border-b last:border-b-0 last:pb-0">
                      <div className="flex-1 space-y-1">
                        <p className="font-semibold text-foreground line-clamp-1">{application.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                        <p className="text-xs text-muted-foreground">{timeAgo(application.appliedAt)}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" onClick={() => setActiveTab("applications")} data-testid="button-view-all-applications">
                  Lihat Semua Lamaran
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Rekomendasi Pekerjaan</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Berdasarkan skill dan pengalaman Anda
                </p>
                <div className="space-y-4">
                  {MOCK_APPLIED_JOBS.slice(0, 2).map((job) => (
                    <div key={job.id} className="p-4 bg-accent/5 rounded-lg border border-accent/20 hover-elevate transition-all">
                      <p className="font-semibold text-foreground line-clamp-1 mb-1">{job.title}</p>
                      <p className="text-sm text-muted-foreground mb-2">{job.company}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">{job.category}</Badge>
                        <span className="text-sm font-bold text-accent-foreground">{job.tokenCost} Token</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">Semua Lamaran</h3>
              <div className="space-y-4">
                {MOCK_APPLICATIONS.map((application) => (
                  <div key={application.id} className="p-4 border rounded-lg hover-elevate transition-all" data-testid={`card-application-${application.id}`}>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1">{application.jobTitle}</h4>
                        <p className="text-sm text-muted-foreground">{application.company}</p>
                      </div>
                      {getStatusBadge(application.status)}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Dilamar {timeAgo(application.appliedAt)}</span>
                      <span className="font-semibold text-foreground">Rate: {application.proposedRate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="saved" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {MOCK_APPLIED_JOBS.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
