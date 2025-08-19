import { Phone } from "lucide-react";

export default function FeaturedOffers() {
  const offers = [
    {
      id: 1,
      title: "GET 5 TIFFINS FREE WITH KING'S FEAST DELUXE",
      description: "5 Roti • 3 Curries • 1 Rice • 1 Salad",
      price: 229,
      featured: true,
    },
    {
      id: 2,
      title: "Mini Meal Special",
      description: "Big on Taste. Light on the Pocket.",
      price: 169,
      featured: false,
    },
    {
      id: 3,
      title: "SAFFRON DELIGHT",
      description: "7 Roti • 3 Curries • 1 Rice • 1 Salad",
      price: 245,
      featured: false,
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`card text-center ${
                offer.featured
                  ? "gradient-bg text-white ring-4 ring-yellow-300 transform scale-105"
                  : "bg-white"
              }`}>
              {offer.featured && (
                <div className="bg-yellow-300 text-gray-800 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                  🔥 BEST OFFER
                </div>
              )}

              <h3
                className={`text-xl font-bold mb-3 ${
                  offer.featured ? "text-white" : "text-gray-800"
                }`}>
                {offer.title}
              </h3>

              <p
                className={`mb-4 ${
                  offer.featured ? "text-orange-100" : "text-gray-600"
                }`}>
                {offer.description}
              </p>

              <div
                className={`text-3xl font-bold mb-6 ${
                  offer.featured ? "text-yellow-300" : "text-primary-600"
                }`}>
                ${offer.price}
              </div>

              <a
                href="tel:+919627669554"
                className={`btn w-full ${
                  offer.featured
                    ? "bg-white text-primary-600 hover:bg-gray-50"
                    : "btn-primary"
                }`}>
                <Phone className="w-4 h-4" />
                Order Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
