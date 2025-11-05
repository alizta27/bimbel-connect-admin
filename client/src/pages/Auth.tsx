import AuthForm from "@/components/AuthForm";

export default function Auth() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-accent/10 to-background">
      <AuthForm onAuth={(data) => console.log('Auth submitted:', data)} />
    </div>
  );
}
