import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import JobCard from "@/components/JobCard";
import JobFilters from "@/components/JobFilters";
import { Button } from "@/components/ui/button";
import type { Job } from "@/components/JobCard";
import { authService } from "@/lib/auth";

//todo: remove mock functionality
const MOCK_JOBS: Job[] = [
  {
    id: "1",
    title: "Desainer UI/UX untuk Aplikasi Mobile E-Commerce",
    company: "TechStart Indonesia",
    location: "Jakarta, Remote",
    tokenCost: 3,
    description: "Kami mencari desainer UI/UX berpengalaman untuk merancang aplikasi mobile e-commerce yang modern dan user-friendly. Proyek ini mencakup wireframing, prototyping, dan design system.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Mobile Design"],
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
    description: "Dibutuhkan full stack developer untuk membangun platform edukasi online dengan fitur live streaming, quiz interaktif, dan sistem manajemen konten.",
    skills: ["React", "Node.js", "PostgreSQL", "WebRTC", "AWS"],
    postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 15.000.000 - Rp 25.000.000",
    category: "Programming"
  },
  {
    id: "3",
    title: "Content Writer Bahasa Indonesia - Travel & Lifestyle",
    company: "Wanderlust Media",
    location: "Remote",
    tokenCost: 2,
    description: "Kami membutuhkan content writer yang passionate tentang travel dan lifestyle untuk menulis artikel blog, social media caption, dan newsletter.",
    skills: ["Content Writing", "SEO", "Storytelling", "Social Media"],
    postedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 2.000.000 - Rp 4.000.000",
    category: "Writing"
  },
  {
    id: "4",
    title: "Digital Marketing Specialist - B2B SaaS",
    company: "CloudSolusi",
    location: "Surabaya, Remote",
    tokenCost: 4,
    description: "Mencari digital marketing specialist dengan pengalaman di B2B SaaS untuk mengelola campaign, SEO, dan lead generation.",
    skills: ["Google Ads", "SEO", "Email Marketing", "Analytics", "B2B Marketing"],
    postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 8.000.000 - Rp 12.000.000",
    category: "Marketing"
  },
  {
    id: "5",
    title: "Video Editor untuk YouTube Channel",
    company: "Creative Studio ID",
    location: "Yogyakarta, Remote",
    tokenCost: 2,
    description: "Dibutuhkan video editor untuk YouTube channel dengan fokus pada konten edukasi dan entertainment. Harus familiar dengan Adobe Premiere dan After Effects.",
    skills: ["Video Editing", "Adobe Premiere", "After Effects", "Color Grading"],
    postedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 3.000.000 - Rp 6.000.000",
    category: "Video & Animation"
  },
  {
    id: "6",
    title: "Data Entry & Admin Support",
    company: "BizOps Indonesia",
    location: "Jakarta, On-site",
    tokenCost: 1,
    description: "Membutuhkan tenaga data entry dan admin support untuk input data, manage spreadsheet, dan tugas administratif lainnya.",
    skills: ["Excel", "Data Entry", "Google Sheets", "Administration"],
    postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    budget: "Rp 3.000.000 - Rp 5.000.000",
    category: "Data Entry"
  },
];

export default function Home() {
  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [filteredJobs, setFilteredJobs] = useState(MOCK_JOBS);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    // Update user state on mount
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
    const filtered = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query.toLowerCase()) ||
        job.description.toLowerCase().includes(query.toLowerCase()) ||
        job.company.toLowerCase().includes(query.toLowerCase()) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query.toLowerCase()))
    );
    setFilteredJobs(filtered);
  };

  const handleFilterChange = (filters: any) => {
    console.log("Filters applied:", filters);
    let filtered = [...jobs];

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((job) => filters.categories.includes(job.category));
    }

    if (filters.tokenRange) {
      filtered = filtered.filter(
        (job) => job.tokenCost >= filters.tokenRange[0] && job.tokenCost <= filters.tokenRange[1]
      );
    }

    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userRole={currentUser?.role || null}
        tokenBalance={currentUser?.tokenBalance}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
      />
      
      <Hero onSearch={handleSearch} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <JobFilters onFilterChange={handleFilterChange} />
          </aside>

          <main className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Pekerjaan Tersedia
              </h2>
              <p className="text-muted-foreground">
                Ditemukan {filteredJobs.length} pekerjaan
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}

              {filteredJobs.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-lg text-muted-foreground mb-4">
                    Tidak ada pekerjaan yang sesuai dengan filter Anda
                  </p>
                  <Button variant="outline" onClick={() => setFilteredJobs(jobs)} data-testid="button-clear-filters">
                    Hapus Filter
                  </Button>
                </div>
              )}
            </div>

            {filteredJobs.length > 0 && (
              <div className="mt-8 text-center">
                <Button variant="outline" size="lg" data-testid="button-load-more">
                  Muat Lebih Banyak
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
