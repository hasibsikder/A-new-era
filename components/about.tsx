import { Award, Truck, Headphones } from "lucide-react";

export function About() {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description:
        "Every product is carefully selected and tested to ensure it meets our high standards for quality and durability.",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "We offer quick and reliable shipping options to get your products to you as soon as possible.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Our dedicated customer support team is always ready to help you with any questions or concerns.",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 glass rounded-full animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-24 h-24 glass rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">About Hasib's Shop</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about bringing you the finest products with cutting-edge design and exceptional quality
          </p>
        </div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image container */}
          <div className="glass-strong rounded-3xl p-8">
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Modern office workspace with design elements"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
              loading="lazy"
            />
          </div>

          {/* Features list */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Extracted FeatureCard component for better reusability
function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-start space-x-4">
        <div className="glass w-12 h-12 rounded-xl flex items-center justify-center">
          <Icon className="text-indigo-600 w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
}
