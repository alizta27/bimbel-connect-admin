import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import RegistrationForm from "@/components/RegistrationForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Programs />
      <RegistrationForm />
      <Footer />
    </div>
  );
};

export default Index;