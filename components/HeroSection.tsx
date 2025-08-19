import { MessageCircle, Phone } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="pt-20 pb-16 gradient-bg text-white">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Hero Text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Fresh, Authentic
                <br />
                <span className="text-yellow-300">Indian Meals</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-100">
                From Our Kitchen to Your Door — Fresh, Healthy, and Authentic.
              </p>
              <p className="text-lg text-orange-200 max-w-lg">
                Enjoy wholesome meals made with love, fresh ingredients, and timeless
                Indian recipes — delivered hot to your doorstep every day.
              </p>
            </div>
          
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:+919627669554"
                className="btn bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-8 py-4"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="https://wa.me/919627669554?text=Hello%20👋%20I%20am%20interested%20in%20Rakshit%20Tiffin%20Service.%20Please%20share%20the%20details."
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </div>
          
            {/* Optional stats section for trust */}
            {/* <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">500+</div>
                <div className="text-sm text-orange-200">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">4.8★</div>
                <div className="text-sm text-orange-200">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">2019</div>
                <div className="text-sm text-orange-200">Since</div>
              </div>
            </div> */}
          </div>


          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-image.jpg"
                alt="Delicious Indian Tiffin"
                width={600}
                height={500}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-white text-gray-800 p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Free Delivery</div>
              <div className="text-xs text-gray-500">Throughout GTA</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-secondary-500 text-white p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Fresh Daily</div>
              <div className="text-xs">Made with ❤️</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
