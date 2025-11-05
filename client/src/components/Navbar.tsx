import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Coins, Menu, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authService } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  userRole?: "employer" | "freelancer" | null;
  tokenBalance?: number;
  userName?: string;
  userAvatar?: string;
}

export default function Navbar({ userRole, tokenBalance, userName, userAvatar }: NavbarProps) {
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    authService.logout();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun KerjaAja",
    });
    setLocation("/");
    // Reload to update navbar
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-sidebar border-b border-sidebar-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="flex items-center gap-2 hover-elevate rounded-lg px-3 py-2" data-testid="link-home">
                <span className="text-2xl font-bold text-sidebar-foreground tracking-wide">
                  KerjaAja
                </span>
              </a>
            </Link>

            <div className="hidden md:flex items-center gap-2">
              <Link href="/">
                <a data-testid="link-jobs">
                  <Button variant="ghost" className="text-sidebar-foreground hover:text-sidebar-foreground">
                    Cari Pekerjaan
                  </Button>
                </a>
              </Link>
              {userRole === "employer" && (
                <Link href="/post-job">
                  <a data-testid="link-post-job">
                    <Button variant="ghost" className="text-sidebar-foreground hover:text-sidebar-foreground">
                      Posting Pekerjaan
                    </Button>
                  </a>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {userRole === "freelancer" && tokenBalance !== undefined && (
              <div className="hidden sm:flex items-center gap-2 bg-accent/30 px-4 py-2 rounded-full border-2 border-accent" data-testid="display-token-balance">
                <Coins className="w-5 h-5 text-accent-foreground" />
                <span className="font-bold text-accent-foreground">{tokenBalance} Token</span>
              </div>
            )}

            {userRole ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={userAvatar} alt={userName} />
                      <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                        {userName?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="font-semibold">{userName}</span>
                      <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem data-testid="button-dashboard">
                    <Link href="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem data-testid="button-profile">
                    <Link href="/profile">Profil Saya</Link>
                  </DropdownMenuItem>
                  {userRole === "freelancer" && (
                    <DropdownMenuItem data-testid="button-tokens">
                      <Link href="/buy-tokens">Beli Token</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={handleLogout}
                    data-testid="button-logout"
                  >
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <a data-testid="link-login">
                    <Button variant="ghost" className="text-sidebar-foreground hover:text-sidebar-foreground">
                      Masuk
                    </Button>
                  </a>
                </Link>
                <Link href="/register">
                  <a data-testid="link-register">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent">
                      Daftar Gratis
                    </Button>
                  </a>
                </Link>
              </div>
            )}

            <Button variant="ghost" size="icon" className="md:hidden text-sidebar-foreground" data-testid="button-menu">
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
