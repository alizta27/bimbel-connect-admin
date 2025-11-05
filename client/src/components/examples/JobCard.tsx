import JobCard from '../JobCard'

export default function JobCardExample() {
  const mockJob = {
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
  };

  return (
    <div className="max-w-2xl">
      <JobCard job={mockJob} />
    </div>
  );
}
