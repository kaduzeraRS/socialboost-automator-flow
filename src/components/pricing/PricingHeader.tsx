
interface PricingHeaderProps {
  currentPlan: string | null;
  isLoggedIn: boolean;
}

const PricingHeader = ({ currentPlan, isLoggedIn }: PricingHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        Planos de Assinatura
      </h2>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        Escolha o plano ideal para o seu negócio. Comece grátis e escale conforme cresce.
      </p>
      {isLoggedIn && currentPlan && (
        <div className="mt-4">
          <span className="inline-block bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 px-4 py-2 rounded-full text-sm font-medium">
            Seu Plano Atual: {currentPlan}
          </span>
        </div>
      )}
    </div>
  );
};

export default PricingHeader;
