import { useParams } from "wouter";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BidForm from "@/components/BidForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Clock, Coins, Briefcase, CheckCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authService } from "@/lib/auth";

//todo: remove mock functionality
const MOCK_JOB = {
  id: "1",
  title: "Desainer UI/UX untuk Aplikasi Mobile E-Commerce",
  company: "TechStart Indonesia",
  companyLogo: "",
  location: "Jakarta, Remote",
  tokenCost: 3,
  description: "Kami mencari desainer UI/UX berpengalaman untuk merancang aplikasi mobile e-commerce yang modern dan user-friendly. Proyek ini mencakup wireframing, prototyping, dan design system.",
  detailedDescription: `
## Deskripsi Proyek

Kami sedang membangun aplikasi mobile e-commerce yang akan merevolusi cara orang berbelanja online di Indonesia. Kami membutuhkan desainer UI/UX yang talented untuk membantu kami menciptakan pengalaman pengguna yang luar biasa.

## Tanggung Jawab

- Membuat wireframe dan mockup untuk aplikasi mobile (iOS & Android)
- Merancang user flow yang intuitif dan mudah digunakan
- Membuat design system yang konsisten
- Berkolaborasi dengan tim development untuk implementasi
- Melakukan user testing dan iterasi berdasarkan feedback

## Yang Kami Cari

- Minimal 2 tahun pengalaman di UI/UX design
- Portfolio yang menunjukkan pengalaman design aplikasi mobile
- Mahir menggunakan Figma atau tools design lainnya
- Pemahaman yang baik tentang design principles dan best practices
- Kemampuan komunikasi yang baik
- Bonus: Pengalaman dengan e-commerce atau fintech apps

## Timeline

Proyek ini diperkirakan akan selesai dalam 2-3 bulan, dengan deliverables bertahap setiap 2 minggu.
  `,
  skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Mobile Design", "Design System"],
  postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  budget: "Rp 5.000.000 - Rp 8.000.000",
  category: "Design",
  projectDuration: "2-3 bulan",
  experienceLevel: "Intermediate",
  applicants: 12,
};

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id;
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

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
    <div className="min-h-screen bg-background">
      <Navbar
        userRole={currentUser?.role || null}
        tokenBalance={currentUser?.tokenBalance}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <main className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={MOCK_JOB.companyLogo} alt={MOCK_JOB.company} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl font-bold">
                      {MOCK_JOB.company.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary">{MOCK_JOB.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{timeAgo(MOCK_JOB.postedAt)}</span>
                      </div>
                    </div>

                    <h1 className="text-3xl font-bold text-foreground leading-tight" data-testid="text-job-title">
                      {MOCK_JOB.title}
                    </h1>

                    <div className="flex items-center gap-4 text-muted-foreground flex-wrap">
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        <span className="font-medium">{MOCK_JOB.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{MOCK_JOB.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{MOCK_JOB.experienceLevel}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Budget Proyek</p>
                    <p className="text-2xl font-bold text-foreground">{MOCK_JOB.budget}</p>
                  </div>
                  <div className="space-y-1 text-right">
                    <p className="text-sm text-muted-foreground">Durasi</p>
                    <p className="text-lg font-semibold text-foreground">{MOCK_JOB.projectDuration}</p>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {MOCK_JOB.detailedDescription}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-foreground mb-3">Skill yang Dibutuhkan</h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    {MOCK_JOB.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{MOCK_JOB.applicants}</span> orang telah melamar pekerjaan ini
                  </p>
                </div>
              </div>
            </Card>
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-20 space-y-6">
              <BidForm
                jobTitle={MOCK_JOB.title}
                tokenCost={MOCK_JOB.tokenCost}
                userTokenBalance={currentUser?.tokenBalance || 0}
                onSubmit={(data) => console.log("Bid submitted:", data)}
              />

              <Card className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">Tentang Pemberi Kerja</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                        {MOCK_JOB.company.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{MOCK_JOB.company}</p>
                      <p className="text-sm text-muted-foreground">Individu</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Pemberi kerja yang fokus pada solusi e-commerce untuk UMKM di Indonesia.
                  </p>
                  <Button variant="outline" className="w-full" data-testid="button-view-employer">
                    Lihat Profil Pemberi Kerja
                  </Button>
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
