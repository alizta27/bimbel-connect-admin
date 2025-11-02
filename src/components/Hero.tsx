import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const scrollToRegistration = () => {
    const element = document.getElementById("registration");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary via-primary to-primary-dark">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-40 right-1/3 w-36 h-36 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo/Brand */}
          <div className="mb-8 animate-fade-in">
            <h3 className="text-2xl md:text-3xl font-bold text-white/90 mb-2">
              Gate World
            </h3>
            <p className="text-white/70 text-sm md:text-base">
              Explore the World From Indonesia
            </p>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight leading-tight animate-fade-in-up">
            BIMBEL
            <br />
            <span className="text-secondary drop-shadow-lg">EKSTRA</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Program Persiapan Kuliah di Al-Azhar (Mesir), Turkiye, Timur Tengah & Asia Tengah (Kazakhstan & Uzbekistan)
          </p>

          {/* Badge */}
          <div className="inline-block bg-secondary text-primary px-8 py-4 rounded-2xl mb-8 shadow-gold animate-fade-in-up delay-300">
            <h3 className="text-2xl md:text-3xl font-bold mb-2">KUPAS TUNTAS</h3>
            <p className="text-sm md:text-base font-medium">
              Tembus Kampus Al-Azhar Mesir, Turkiye, Timur Tengah & Asia Tengah
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-400">
            <Button
              size="lg"
              onClick={scrollToRegistration}
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold text-lg px-8 py-6 rounded-xl shadow-gold hover:shadow-xl transition-all hover:scale-105"
            >
              Daftar Sekarang
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <a href="https://wa.me/6287843825469" target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 font-bold text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all hover:scale-105"
              >
                Hubungi Kami
              </Button>
            </a>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto animate-fade-in-up delay-500">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl font-black text-secondary mb-2">10</div>
              <p className="text-white font-semibold">Maximum Capacity Per Class</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all">
              <div className="text-4xl font-black text-secondary mb-2">31 Okt</div>
              <p className="text-white font-semibold">Daftar Sebelum 31 Oktober 2025</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;