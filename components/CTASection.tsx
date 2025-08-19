import { MessageCircle, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section id="contact" className="section-padding gradient-bg text-white">
      <div className="container">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience Authentic Flavors?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Call us now and taste the difference! Fresh, delicious meals
            delivered daily.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+919627669554"
              className="btn bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-8 py-4">
              <Phone className="w-5 h-5" />
              Call Now: +91 96276 69554
            </a>
            <a
              href="https://wa.me/+919627669554"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-lg px-8 py-4">
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>

       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
           <div>
             <h3 className="text-lg font-semibold mb-2">📞 Phone Support</h3>
             <p className="text-orange-200">Mon - Sun: 8:00 AM - 10:00 PM</p>
           </div>
           <div>
             <h3 className="text-lg font-semibold mb-2">🚚 Free Delivery</h3>
             <p className="text-orange-200">
               Premnagar, Sudhowala & Panditwari (Dehradun)
             </p>
           </div>
           <div>
             <h3 className="text-lg font-semibold mb-2">⭐ Quality Assured</h3>
             <p className="text-orange-200">Fresh meals prepared daily</p>
           </div>
         </div>

        </div>
      </div>
    </section>
  );
}
