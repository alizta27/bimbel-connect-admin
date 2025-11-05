import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import heroImage from "@assets/generated_images/Indonesian_freelancers_collaboration_hero_22fe1126.png";

interface HeroProps {
  onSearch?: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch?.(query);
    console.log("Search triggered:", query);
  };

  return (
    <div className="relative bg-gradient-to-br from-background via-accent/20 to-background overflow-hidden">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background/95" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Temukan Pekerjaan Impian<br />
              <span className="text-accent">Mulai Kerja Aja!</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-medium">
              Platform terpercaya untuk freelancer dan pemberi kerja di Indonesia. 
              Ribuan proyek menanti Anda.
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  name="search"
                  placeholder="Cari pekerjaan, skill, atau pemberi kerja..."
                  className="w-full pl-12 pr-4 py-4 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-base"
                  data-testid="input-search"
                />
              </div>
              <Button 
                type="submit" 
                size="lg" 
                className="px-8 py-4 text-base font-semibold rounded-xl"
                data-testid="button-search"
              >
                Cari Sekarang
              </Button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm">
            <span className="font-semibold">Kategori populer:</span>
            <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20" data-testid="button-category-design">
              Design
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20" data-testid="button-category-programming">
              Programming
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20" data-testid="button-category-marketing">
              Marketing
            </Button>
            <Button variant="outline" size="sm" className="rounded-full bg-white/10 text-white border-white/30 hover:bg-white/20" data-testid="button-category-writing">
              Writing
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
