import { Globe, ShoppingCart, MessageCircle, ShieldCheck } from 'lucide-react';
import SpotlightCard from '../../Libraries/SpotlightCard';
const services = [
  {
    icon: <Globe className="h-8 w-8 text-[#D7CCC8]" />,
    title: "Delivery worldwide",
    description: "Receive your order anywhere in the world",
  },
  {
    icon: <ShoppingCart className="h-8 w-8 text-[#D7CCC8]" />,
    title: "Fast shipping",
    description: "Super-fast shipping in 48 hours top",
  },
  {
    icon: <MessageCircle className="h-8 w-8 text-[#D7CCC8]" />,
    title: "Expert advice",
    description: "Our experts are available on WhatsApp",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-[#D7CCC8]" />,
    title: "100% secure",
    description: "All orders are processed securely",
  },
];

export default function InfoGrid() {
  return (
    <section className="bg-[#A1887F] py-10 px-4 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y gap-5 sm:divide-y-0 sm:divide-x  rounded">
        {services.map((service, index) => (
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(109, 76, 65, 1)">
            <div
              key={index}
              className="flex flex-col  items-center text-center px-6 py-8 bg-[#F5F5F5]"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-base font-semibold mb-1 text-[#6D4C41]">{service.title}</h3>
              <p className="text-sm text-[#8D6E63]">{service.description}</p>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
