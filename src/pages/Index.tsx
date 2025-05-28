
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HomePricingSection from '@/components/HomePricingSection';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

const Index = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HomePricingSection />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Index;
