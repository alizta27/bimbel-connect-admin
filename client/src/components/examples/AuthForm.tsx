import AuthForm from '../AuthForm'

export default function AuthFormExample() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <AuthForm onAuth={(data) => console.log('Auth submitted:', data)} />
    </div>
  );
}
