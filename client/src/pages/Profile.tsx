import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, Plus, X, Save, MapPin, Mail, Phone, Briefcase, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";

//todo: remove mock functionality
const MOCK_USER = {
  name: "Budi Santoso",
  email: "budi.santoso@email.com",
  phone: "+62 812-3456-7890",
  location: "Jakarta, Indonesia",
  role: "freelancer" as const,
  bio: "UI/UX Designer dengan 5+ tahun pengalaman dalam merancang aplikasi mobile dan web. Passionate tentang menciptakan pengalaman pengguna yang intuitif dan menarik.",
  avatar: "",
  skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design System", "Adobe XD"],
  hourlyRate: "150000",
  availability: "available" as const,
  portfolio: [
    {
      id: "1",
      title: "E-Commerce Mobile App",
      description: "Redesign aplikasi e-commerce untuk meningkatkan conversion rate",
      image: "",
    },
    {
      id: "2",
      title: "Banking Dashboard",
      description: "Design system untuk platform banking digital",
      image: "",
    },
  ],
  experience: [
    {
      id: "1",
      title: "Senior UI/UX Designer",
      company: "Tech Company Inc",
      period: "2020 - Sekarang",
      description: "Memimpin tim design untuk berbagai proyek digital",
    },
    {
      id: "2",
      title: "UI/UX Designer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description: "Merancang website dan aplikasi mobile untuk klien",
    },
  ],
};

export default function Profile() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());
  const [formData, setFormData] = useState({
    ...MOCK_USER,
    ...currentUser,
  });
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    if (user) {
      setFormData((prev) => ({ ...prev, ...user }));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", formData);
    setIsEditing(false);
    toast({
      title: "Profil Berhasil Diperbarui",
      description: "Perubahan profil Anda telah disimpan.",
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar userRole={formData.role} tokenBalance={25} userName={formData.name} userAvatar={formData.avatar} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Profil Saya</h1>
            <p className="text-muted-foreground">Kelola informasi profil Anda</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} data-testid="button-edit-profile">
              Edit Profil
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} data-testid="button-cancel-edit">
                Batal
              </Button>
              <Button onClick={handleSave} data-testid="button-save-profile">
                <Save className="w-4 h-4 mr-2" />
                Simpan
              </Button>
            </div>
          )}
        </div>

        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic" data-testid="tab-basic">Informasi Dasar</TabsTrigger>
            <TabsTrigger value="professional" data-testid="tab-professional">Profesional</TabsTrigger>
            <TabsTrigger value="portfolio" data-testid="tab-portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card className="p-6">
              <form onSubmit={handleSave} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="relative">
                    <Avatar className="w-32 h-32">
                      <AvatarImage src={formData.avatar} alt={formData.name} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
                        {formData.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        type="button"
                        size="icon"
                        variant="secondary"
                        className="absolute bottom-0 right-0 rounded-full"
                        data-testid="button-upload-avatar"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={!isEditing}
                          data-testid="input-name"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10"
                            data-testid="input-email"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Nomor Telepon</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10"
                            data-testid="input-phone"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Lokasi</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="location"
                            value={formData.location}
                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                            disabled={!isEditing}
                            className="pl-10"
                            data-testid="input-location"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        disabled={!isEditing}
                        rows={4}
                        placeholder="Ceritakan tentang diri Anda..."
                        data-testid="input-bio"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4">Keahlian & Tarif</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Tarif per Jam (Rp)</Label>
                    <Input
                      id="hourlyRate"
                      type="text"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      disabled={!isEditing}
                      data-testid="input-hourly-rate"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availability">Status Ketersediaan</Label>
                    <select
                      id="availability"
                      value={formData.availability}
                      onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                      disabled={!isEditing}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      data-testid="select-availability"
                    >
                      <option value="available">Tersedia</option>
                      <option value="busy">Sibuk</option>
                      <option value="unavailable">Tidak Tersedia</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Keahlian</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-sm">
                        {skill}
                        {isEditing && (
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-2 hover:text-destructive"
                            data-testid={`button-remove-skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </Badge>
                    ))}
                  </div>

                  {isEditing && (
                    <div className="flex gap-2 mt-3">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Tambah keahlian baru..."
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
                        data-testid="input-new-skill"
                      />
                      <Button type="button" onClick={handleAddSkill} data-testid="button-add-skill">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Pengalaman</h3>
                {isEditing && (
                  <Button type="button" variant="outline" size="sm" data-testid="button-add-experience">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                {formData.experience.map((exp) => (
                  <div key={exp.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <h4 className="font-bold text-foreground">{exp.title}</h4>
                        </div>
                        <p className="text-sm font-medium text-muted-foreground mb-1">{exp.company}</p>
                        <p className="text-xs text-muted-foreground mb-2">{exp.period}</p>
                        <p className="text-sm text-foreground">{exp.description}</p>
                      </div>
                      {isEditing && (
                        <Button type="button" variant="ghost" size="icon" data-testid={`button-remove-experience-${exp.id}`}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">Portfolio Proyek</h3>
                {isEditing && (
                  <Button type="button" variant="outline" data-testid="button-add-portfolio">
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Proyek
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.portfolio.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover-elevate transition-all">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      <Award className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-foreground mb-2">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      {isEditing && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="mt-2 text-destructive hover:text-destructive"
                          data-testid={`button-remove-portfolio-${project.id}`}
                        >
                          Hapus
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}

                {formData.portfolio.length === 0 && (
                  <div className="col-span-2 text-center py-12 text-muted-foreground">
                    <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Belum ada portfolio. Tambahkan proyek Anda!</p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
