import { Award, Leaf, Truck, Utensils } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Utensils,
      title: "Authentic Recipes",
      description:
        "Traditional Indian recipes prepared with love and authentic spices",
    },
    {
      icon: Leaf,
      title: "Fresh Daily",
      description: "Meals prepared fresh every day with the finest ingredients",
    },
    {
      icon: Truck,
      title: "Free Delivery",
      description: "Complimentary delivery throughout the Greater Toronto Area",
    },
    {
      icon: Award,
      title: "Quality Assured",
      description: "Premium quality meals that exceed your expectations",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose YTS?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the perfect blend of authentic flavors, convenience, and
            quality
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="card text-center group hover:shadow-xl transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
