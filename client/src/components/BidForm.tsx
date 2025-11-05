import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Coins, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";

interface BidFormProps {
  jobTitle: string;
  tokenCost: number;
  userTokenBalance: number;
  onSubmit?: (data: any) => void;
}

export default function BidForm({ jobTitle, tokenCost, userTokenBalance, onSubmit }: BidFormProps) {
  const [proposedRate, setProposedRate] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const hasEnoughTokens = userTokenBalance >= tokenCost;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!hasEnoughTokens) return;
    
    const data = {
      proposedRate,
      coverLetter,
      jobTitle,
    };
    onSubmit?.(data);
    console.log("Bid submitted:", data);
  };

  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Lamar Pekerjaan</h3>
          <p className="text-sm text-muted-foreground">
            Kirim proposal Anda untuk: <span className="font-semibold">{jobTitle}</span>
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg border border-accent">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-accent-foreground" />
            <span className="text-sm font-medium">Biaya Lamar</span>
          </div>
          <span className="text-lg font-bold text-accent-foreground">{tokenCost} Token</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
          <span className="text-sm font-medium">Saldo Token Anda</span>
          <span className={`text-lg font-bold ${hasEnoughTokens ? 'text-green-600' : 'text-destructive'}`}>
            {userTokenBalance} Token
          </span>
        </div>

        {!hasEnoughTokens && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Token Anda tidak cukup. Silakan beli token terlebih dahulu untuk melamar pekerjaan ini.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposed-rate">Rate yang Diajukan (Rp)</Label>
            <Input
              id="proposed-rate"
              name="proposedRate"
              type="text"
              placeholder="Contoh: 5.000.000"
              value={proposedRate}
              onChange={(e) => setProposedRate(e.target.value)}
              required
              data-testid="input-proposed-rate"
            />
            <p className="text-xs text-muted-foreground">
              Masukkan estimasi biaya untuk menyelesaikan proyek ini
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover-letter">Cover Letter</Label>
            <Textarea
              id="cover-letter"
              name="coverLetter"
              placeholder="Jelaskan mengapa Anda cocok untuk pekerjaan ini, pengalaman relevan, dan pendekatan Anda..."
              rows={8}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              required
              data-testid="input-cover-letter"
            />
            <p className="text-xs text-muted-foreground">
              Minimal 100 karakter
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!hasEnoughTokens}
              data-testid="button-submit-bid"
            >
              {hasEnoughTokens ? "Kirim Lamaran" : "Token Tidak Cukup"}
            </Button>

            {!hasEnoughTokens && (
              <Button
                type="button"
                variant="outline"
                className="w-full"
                data-testid="button-buy-tokens"
              >
                Beli Token
              </Button>
            )}
          </div>
        </form>
      </div>
    </Card>
  );
}
