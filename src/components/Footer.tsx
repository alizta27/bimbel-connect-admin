import { MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-secondary">Gate World</h3>
            <p className="text-white/80 mb-4">
              Explore the World From Indonesia
            </p>
            <p className="text-white/70">
              Program Persiapan Kuliah di Al-Azhar (Mesir), Turkiye, Timur Tengah & Asia Tengah
            </p>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-4 text-secondary">Informasi Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                <p className="text-white/80">
                  Jl. H. Lamuse, BTN Fadhil Indah, H.4, Kel. Lepo-lepo, Kec. Baruga, Kota Kendari, Sulawesi Tenggara
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a
                  href="https://wa.me/6287843825469"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-secondary transition-colors"
                >
                  +62878-4382-5469 (Kak Agus)
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © {new Date().getFullYear()} Gate World. All rights reserved.
          </p>
          <p className="text-secondary font-semibold mt-2">
            *Pembukaan Kelas Per 17 November 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;