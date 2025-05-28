
const PricingFooter = () => {
  return (
    <div className="text-center mt-12">
      <p className="text-muted-foreground mb-4">
        Todos os planos incluem 3 dias de teste grátis
      </p>
      <div className="inline-flex items-center space-x-4 text-sm text-muted-foreground">
        <span className="flex items-center">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Sem taxa de setup
        </span>
        <span className="flex items-center">
          <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Cancele quando quiser
        </span>
      </div>
    </div>
  );
};

export default PricingFooter;
