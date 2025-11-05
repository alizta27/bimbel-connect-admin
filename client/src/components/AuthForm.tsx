import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Briefcase, User } from "lucide-react";

interface AuthFormProps {
  onAuth?: (data: any) => void;
}

export default function AuthForm({ onAuth }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState<"freelancer" | "employer">("freelancer");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    onAuth?.({ ...data, type, role: type === "register" ? role : undefined });
    console.log(`${type} form submitted:`, { ...data, role: type === "register" ? role : undefined });
  };

  return (
    <div className="w-full max-w-md">
      <Card className="p-8 shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">KerjaAja</h2>
          <p className="text-muted-foreground">Platform freelance terpercaya di Indonesia</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" data-testid="tab-login">Masuk</TabsTrigger>
            <TabsTrigger value="register" data-testid="tab-register">Daftar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form onSubmit={(e) => handleSubmit(e, "login")} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  data-testid="input-login-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  data-testid="input-login-password"
                />
              </div>

              <Button type="submit" className="w-full" data-testid="button-login-submit">
                Masuk
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                <a href="#" className="hover:underline">Lupa password?</a>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form onSubmit={(e) => handleSubmit(e, "register")} className="space-y-4">
              <div className="space-y-3">
                <Label>Daftar sebagai</Label>
                <RadioGroup value={role} onValueChange={(v) => setRole(v as any)}>
                  <div className="grid grid-cols-2 gap-3">
                    <Label
                      htmlFor="role-freelancer"
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        role === "freelancer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="freelancer" id="role-freelancer" className="sr-only" data-testid="radio-freelancer" />
                      <User className="w-8 h-8 text-primary" />
                      <span className="font-semibold">Freelancer</span>
                    </Label>

                    <Label
                      htmlFor="role-employer"
                      className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        role === "employer"
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <RadioGroupItem value="employer" id="role-employer" className="sr-only" data-testid="radio-employer" />
                      <Briefcase className="w-8 h-8 text-primary" />
                      <span className="font-semibold">Employer</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-name">Nama Lengkap</Label>
                <Input
                  id="register-name"
                  name="name"
                  type="text"
                  placeholder="Nama Anda"
                  required
                  data-testid="input-register-name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  name="email"
                  type="email"
                  placeholder="nama@email.com"
                  required
                  data-testid="input-register-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  data-testid="input-register-password"
                />
              </div>

              <Button type="submit" className="w-full" data-testid="button-register-submit">
                Daftar Sekarang
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Dengan mendaftar, Anda menyetujui{" "}
                <a href="#" className="hover:underline">Syarat & Ketentuan</a> kami
              </p>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
