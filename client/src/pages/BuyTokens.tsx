import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Check, Zap, Star, TrendingUp, CreditCard, Smartphone, Building2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { authService } from "@/lib/auth";

interface TokenPackage {
  id: string;
  name: string;
  tokens: number;
  price: number;
  pricePerToken: number;
  popular?: boolean;
  bonus?: number;
  icon: typeof Coins;
  features: string[];
}

//todo: remove mock functionality
const TOKEN_PACKAGES: TokenPackage[] = [
  {
    id: "starter",
    name: "Starter",
    tokens: 10,
    price: 50000,
    pricePerToken: 5000,
    icon: Coins,
    features: [
      "10 Token untuk melamar pekerjaan",
      "Berlaku 30 hari",
      "Cocok untuk pemula",
    ],
  },
  {
    id: "popular",
    name: "Popular",
    tokens: 25,
    price: 112500,
    pricePerToken: 4500,
    popular: true,
    bonus: 5,
    icon: Star,
    features: [
      "25 Token + 5 Bonus",
      "Berlaku 60 hari",
      "Hemat 10%",
      "Paling populer",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    tokens: 50,
    price: 200000,
    pricePerToken: 4000,
    bonus: 15,
    icon: TrendingUp,
    features: [
      "50 Token + 15 Bonus",
      "Berlaku 90 hari",
      "Hemat 20%",
      "Support prioritas",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tokens: 100,
    price: 350000,
    pricePerToken: 3500,
    bonus: 35,
    icon: Zap,
    features: [
      "100 Token + 35 Bonus",
      "Berlaku 180 hari",
      "Hemat 30%",
      "Akses fitur premium",
      "Support 24/7",
    ],
  },
];

const PAYMENT_METHODS = [
  { id: "credit-card", name: "Kartu Kredit/Debit", icon: CreditCard },
  { id: "e-wallet", name: "E-Wallet (GoPay, OVO, Dana)", icon: Smartphone },
  { id: "bank-transfer", name: "Transfer Bank", icon: Building2 },
];

export default function BuyTokens() {
  const { toast } = useToast();
  const [selectedPackage, setSelectedPackage] = useState<TokenPackage | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(authService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(authService.getCurrentUser());
  }, []);

  const handleSelectPackage = (pkg: TokenPackage) => {
    setSelectedPackage(pkg);
    setIsDialogOpen(true);
  };

  const handlePurchase = () => {
    //todo: integrate with Stripe or payment gateway here
    console.log("Processing payment:", {
      package: selectedPackage,
      paymentMethod,
    });

    setIsDialogOpen(false);
    
    toast({
      title: "Pembelian Berhasil! 🎉",
      description: `Anda telah membeli ${selectedPackage?.tokens}${selectedPackage?.bonus ? ` + ${selectedPackage.bonus} bonus` : ""} token. Token akan segera masuk ke akun Anda.`,
    });

    setSelectedPackage(null);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        userRole={currentUser?.role || null}
        tokenBalance={currentUser?.tokenBalance}
        userName={currentUser?.name}
        userAvatar={currentUser?.avatar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Beli Token KerjaAja</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Token diperlukan untuk melamar pekerjaan. Pilih paket yang sesuai dengan kebutuhan Anda.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 bg-accent/20 px-6 py-3 rounded-full border border-accent">
            <Coins className="w-5 h-5 text-accent-foreground" />
            <span className="text-sm font-medium text-accent-foreground">
              Saldo Anda saat ini: <span className="font-bold text-lg">{currentUser?.tokenBalance || 0} Token</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {TOKEN_PACKAGES.map((pkg) => {
            const Icon = pkg.icon;
            const totalTokens = pkg.tokens + (pkg.bonus || 0);

            return (
              <Card
                key={pkg.id}
                className={`relative p-6 hover-elevate transition-all duration-200 ${
                  pkg.popular ? "border-2 border-primary shadow-lg" : ""
                }`}
                data-testid={`card-package-${pkg.id}`}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                    Paling Populer
                  </Badge>
                )}

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{pkg.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {pkg.tokens} Token{pkg.bonus ? ` + ${pkg.bonus} Bonus` : ""}
                    </p>
                  </div>

                  <div>
                    <div className="text-3xl font-bold text-foreground mb-1">
                      {formatCurrency(pkg.price)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatCurrency(pkg.pricePerToken)} per token
                    </div>
                  </div>

                  {totalTokens !== pkg.tokens && (
                    <Badge variant="secondary" className="text-xs">
                      Total: {totalTokens} Token
                    </Badge>
                  )}

                  <div className="space-y-2 text-left">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant={pkg.popular ? "default" : "outline"}
                    onClick={() => handleSelectPackage(pkg)}
                    data-testid={`button-buy-${pkg.id}`}
                  >
                    Beli Sekarang
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Token Tidak Hangus</h3>
              <p className="text-sm text-muted-foreground">
                Token Anda berlaku sesuai dengan paket yang dipilih
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Pembayaran Aman</h3>
              <p className="text-sm text-muted-foreground">
                Semua transaksi dilindungi dengan enkripsi SSL
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Support 24/7</h3>
              <p className="text-sm text-muted-foreground">
                Tim kami siap membantu kapan saja Anda membutuhkan
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md" data-testid="dialog-payment">
          <DialogHeader>
            <DialogTitle>Konfirmasi Pembelian</DialogTitle>
            <DialogDescription>
              Pilih metode pembayaran untuk melanjutkan pembelian token
            </DialogDescription>
          </DialogHeader>

          {selectedPackage && (
            <div className="space-y-6">
              <div className="p-4 bg-accent/10 rounded-lg border border-accent">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Paket</span>
                  <span className="font-bold text-foreground">{selectedPackage.name}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-muted-foreground">Token</span>
                  <span className="font-bold text-foreground">
                    {selectedPackage.tokens}
                    {selectedPackage.bonus && (
                      <span className="text-primary"> + {selectedPackage.bonus} Bonus</span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-accent/30">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="text-xl font-bold text-primary">
                    {formatCurrency(selectedPackage.price)}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Metode Pembayaran</Label>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {PAYMENT_METHODS.map((method) => {
                    const Icon = method.icon;
                    return (
                      <Label
                        key={method.id}
                        htmlFor={method.id}
                        className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                          paymentMethod === method.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <RadioGroupItem value={method.id} id={method.id} data-testid={`radio-payment-${method.id}`} />
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">{method.name}</span>
                      </Label>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel-payment">
              Batal
            </Button>
            <Button onClick={handlePurchase} data-testid="button-confirm-payment">
              Bayar Sekarang
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
