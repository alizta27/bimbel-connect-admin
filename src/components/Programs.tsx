import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Palette, Globe, Languages, GraduationCap } from "lucide-react";

const programs = [
  {
    id: "calligraphy",
    title: "Kelas Calistung",
    price: "Rp. 400.000,-",
    icon: BookOpen,
    description: "SD/MI",
    schedule: "Sabtu 2 Minggu, 4x Pertemuan, 1x Pertemuan 1.5 Jam, Pukul 13:00-14:30 WITA",
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "graphic_design",
    title: "Kelas Desain Grafis",
    price: "Rp. 700.000,-",
    icon: Palette,
    description: "Adobe Photoshop, Illustrator, Affinity Designer, CorelDRAW, Canva, Coding, dan AI",
    schedule: "Pukul 2 Minggu, 8x Pertemuan, 1x Pertemuan 1.5 Jam, Pukul 13:00-14:30 WITA",
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "english",
    title: "Kelas Bahasa Inggris",
    price: "Rp. 700.000,-",
    icon: Globe,
    description: "Speaking, Grammar, Reading, Writing dan Conversation",
    schedule: "Pukul 2 Minggu, 8x Pertemuan, 1x Pertemuan 1.5 Jam, Pukul 16.00-17.30 WITA",
    color: "from-green-500 to-green-600",
  },
  {
    id: "arabic",
    title: "Kelas Bahasa Arab",
    price: "Rp. 700.000,-",
    icon: Languages,
    description: "Mufrodat, Muhadatsah, Muhadhoroh, Irtiqo'ul Lughah",
    schedule: "Pukul 2 Minggu, 8x Pertemuan, 1x Pertemuan 1.5 Jam, Pukul 16.00-17.30 WITA",
    color: "from-amber-500 to-amber-600",
  },
  {
    id: "al_azhar_turkey_central_asia",
    title: "Kelas Al-Azhar, Turki & Asia Tengah",
    price: "Rp. 6.500.000,-",
    icon: GraduationCap,
    description: "Daurah Tahlili, Mustawa-Darul Lughah, Mu'adalah Ijazah",
    schedule: "Desain Grafis, Bimbingan Senat Lughoh. No Jadwal Spesifi",
    color: "from-rose-500 to-rose-600",
    featured: true,
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Pilih Program Sesuai Kebutuhanmu
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Berbagai pilihan program pembelajaran untuk mempersiapkan masa depan cemerlangmu
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <Card
                key={program.id}
                className={`relative overflow-hidden border-2 hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                  program.featured ? "border-secondary md:col-span-2 lg:col-span-1 lg:row-span-1" : "border-border"
                }`}
              >
                {program.featured && (
                  <Badge className="absolute top-4 right-4 bg-secondary text-primary font-bold">
                    Featured
                  </Badge>
                )}
                <CardHeader>
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${program.color} flex items-center justify-center mb-4 shadow-md`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{program.title}</CardTitle>
                  <div className="text-3xl font-black text-primary mb-2">{program.price}</div>
                  <CardDescription className="text-base">{program.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">{program.schedule}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 bg-primary/5 border-2 border-primary/20 rounded-2xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">Klasifikasi Kelas</h3>
          <ul className="space-y-2 text-foreground">
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span><strong>Calistung</strong> (SD/MI)</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span><strong>Desain Grafis:</strong> Adobe Photoshop, Adobe Illustrator, Affinity Designer, CorelDRAW, dan Canva, Coding, dan AI (Artificial Intelligence)</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span><strong>Bahasa Inggris</strong> (Speaking, Grammar, Reading, Writing dan Conversation)</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span><strong>Bahasa Arab</strong> (Mufrodat, Muhadatsah, Muhadhoroh, Irtiqo'ul Lughah)</span>
            </li>
            <li className="flex items-start">
              <span className="text-secondary mr-2 font-bold">•</span>
              <span><strong>Kelas Al-Azhar, Turki, Timur Tengah dan Asia Tengah</strong> (Daurah Tahlili, Mustawa-Darul Lughah, Mu'adalah Ijazah)</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Programs;