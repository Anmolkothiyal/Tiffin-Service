import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Award, Clock, Heart, Users } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "5+", label: "Years Experience" },
    { number: "4.8★", label: "Average Rating" },
    { number: "1000+", label: "Meals Delivered Daily" },
  ];

  // const team = [
  //   {
  //     name: "Priya Sharma",
  //     role: "Head Chef",
  //     image: "/images/team-sarah.jpg",
  //     description: "15+ years of experience in authentic Indian cuisine",
  //   },
  //   {
  //     name: "Raj Patel",
  //     role: "Operations Manager",
  //     image: "/images/team-raj.jpg",
  //     description: "Ensures fresh and timely delivery across GTA",
  //   },
  //   {
  //     name: "Meera Singh",
  //     role: "Quality Control",
  //     image: "/images/team-priya.jpg",
  //     description: "Maintains the highest standards of food quality",
  //   },
  // ];

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-12 pb-12 gradient-bg text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Started in 2025 – Bringing Ghar Jaisa Swad, Straight to Your Doorstep 🍲
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white pt-12">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Started in 2025 by Rakshit and a team of passionate food
                  lovers, YTS (Rakshit Tiffin Services) was born from a simple
                  idea: everyone deserves access to fresh, homemade, and
                  authentic Indian meals in Dehradun.
                </p>
                <p>
                  What began as a small tiffin service in Premnagar has now
                  grown to serve students, working professionals, and families
                  across Dehradun. Our commitment to quality, taste, and timely
                  delivery has remained the same since day one.
                </p>
                <p>
                  Every meal we prepare is crafted with love, using traditional
                  recipes passed down through generations and fresh ingredients
                  sourced locally. For us, food is not just about filling your
                  stomach—it’s about giving you the comfort of “ghar ka khana.”
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/images/about-story.jpg"
                alt="Our kitchen"
                width={600}
                height={400}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      {/* <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Impact
            </h2>
            <p className="text-xl text-gray-600">
              Numbers that reflect our commitment to excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The traditions and principles that make Rakshit Tiffin Services
              special
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Pyaar Se Bana Khana
              </h3>
              <p className="text-gray-600">
                Every meal is prepared with love and care — just like “ghar ka
                khana”.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Quality First
              </h3>
              <p className="text-gray-600">
                We use fresh ingredients and maintain authentic homemade taste,
                no shortcuts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Community Spirit
              </h3>
              <p className="text-gray-600">
                Serving students, professionals, and families across Dehradun
                with trust.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Hamesha Fresh
              </h3>
              <p className="text-gray-600">
                Meals cooked fresh daily and delivered warm, right on time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team */}
      {/* <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate people behind your delicious meals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA */}
      <section className="section-padding gradient-bg text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Our Story?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join our family of satisfied customers and taste the difference that
            passion makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919627669554"
              className="btn bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-8 py-4">
              Call Now: +91 962 766 9554
            </a>
            <a
              href="/plans"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-lg px-8 py-4">
              View Our Menu
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
