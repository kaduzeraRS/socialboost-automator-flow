
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import HomePricingSection from '@/components/HomePricingSection';

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
