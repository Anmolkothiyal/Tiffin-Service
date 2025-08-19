import { Star } from "lucide-react";

export default function Testimonials() {
 const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Dehradun",
    rating: 5,
    review:
      "Best tiffin service in Dehradun! The food tastes just like home-cooked meals.",
  },
  {
    id: 2,
    name: "Raj Patel",
    location: "Dehradun",
    rating: 5,
    review:
      "Hamesha taza aur swadisht khana milta hai. Bilkul ghar jaisa swaad!",
  },
  {
    id: 3,
    name: "Meera Singh",
    location: "Dehradun",
    rating: 5,
    review:
      "Perfect portion sizes and great value for money. Highly recommended!",
  },
];



  return (
    <section className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="card text-center">
              <div className="flex justify-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-600 mb-6 italic">
                "{testimonial.review}"
              </p>

              <div>
                <div className="font-semibold text-gray-800">
                  {testimonial.name}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
