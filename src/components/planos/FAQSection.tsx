
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const faqs = [
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento."
    },
    {
      question: "Como funciona o período de teste?",
      answer: "Oferecemos 3 dias gratuitos para você testar todos os recursos do plano escolhido após o cadastro do e-mail."
    },
    {
      question: "Posso alterar meu plano depois?",
      answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento."
    },
    {
      question: "Como funcionam as interações extras?",
      answer: "Você pode comprar pacotes de interações adicionais que são válidos por 30 dias após a compra."
    },
    {
      question: "O que acontece se eu exceder os limites?",
      answer: "Se você exceder os limites do seu plano, pode comprar pacotes extras ou fazer upgrade para um plano superior."
    },
    {
      question: "Como funciona o suporte técnico?",
      answer: "O nível de suporte varia conforme o plano: básico (email), prioritário (chat + email) e VIP (WhatsApp + telefone)."
    }
  ];

  return (
    <Card className="dark:bg-card bg-white border-2 border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-foreground">
          <HelpCircle className="w-6 h-6" />
          <span>Perguntas Frequentes</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h4 className="font-medium text-foreground mb-2">{faq.question}</h4>
            <p className="text-sm text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default FAQSection;
