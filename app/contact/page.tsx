"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Handle auto-close of popup
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus.type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message || 'Thank you for your message! We\'ll get back to you soon.'
        });
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Something went wrong. Please try again.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      description: "Call us directly for immediate assistance",
      value: "+91 962 766 9554",
      action: "tel:+919627669554",
      available: "Mon - Sun: 8:00 AM - 10:00 PM",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick and easy messaging",
      value: "Chat with us",
      action: "https://wa.me/+919627669554",
      available: "24/7 Quick Response",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us detailed inquiries",
      value: "info@rakshit.com",
      action: "mailto:info@rakshit.com",
      available: "Response within 24 hours",
    },
  ];

  const serviceAreas = [
    "Premnagar",
    "Sudhowala",
    "Panditwari",
    "Ballupur",
    "Jakhan",
    "Rajpur Road",
    "Clement Town",
    "Vasant Vihar",
    "Patel Nagar",
    "Araghar",
    "Karanpur",
    "Dalanwala",
  ];

  const faqs = [
    {
      question: "Aapki delivery timing kya hai?",
      answer:
        "Hum daily lunch 11:00 AM - 2:00 PM aur dinner 6:00 PM - 9:00 PM ke beech tiffin deliver karte hain.",
    },
    {
      question: "Order kitne time pehle dena chahiye?",
      answer:
        "Hum recommend karte hain ki aap apna order kam se kam 1 din pehle book karein. Lekin same-day orders bhi hum capacity ke hisaab se accept karte hain.",
    },
    {
      question: "Kya aap special diet ke liye customize karte ho?",
      answer:
        "Bilkul! Hum vegetarian, vegan, less-oil, low-spice aur customized diet ke options provide karte hain. Bas order karte waqt batayein.",
    },
    {
      question: "Agar mujhe order cancel karna ho toh?",
      answer:
        "Aap apna order delivery ke 12 ghante pehle tak cancel ya modify kar sakte hain aur full refund milega.",
    },
    {
      question: "Kya events ya bulk orders ke liye tiffin mil sakta hai?",
      answer:
        "Haan, hum parties, functions, aur corporate orders ke liye catering provide karte hain. Kripya 2 din pehle hume contact karein.",
    },
  ];

  return (
    <main className="min-h-screen relative">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-bg text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            We're here to help! Get in touch with us for orders, questions, or
            feedback
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="card text-center group hover:shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-6 gradient-bg rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  <a
                    href={method.action}
                    className="text-primary-600 font-semibold hover:text-primary-700 transition-colors block mb-2">
                    {method.value}
                  </a>
                  <p className="text-sm text-gray-500">{method.available}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    required>
                    <option value="">Select a subject</option>
                    <option value="new-order">New Order Inquiry</option>
                    <option value="existing-order">Existing Order</option>
                    <option value="catering">Catering Services</option>
                    <option value="feedback">Feedback</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full btn-large disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Business Info */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Business Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Service Area
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Serving delicious tiffins all across Dehradun – straight to your doorstep!
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
                      {serviceAreas.map((area, index) => (
                        <span
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">
                      Business Hours
                    </h3>
                    <div className="space-y-1 text-gray-600">
                      <p>
                        <strong>Phone Support:</strong> Mon - Sun, 8:00 AM -
                        10:00 PM
                      </p>
                      <p>
                        <strong>Lunch Delivery:</strong> 11:00 AM - 2:00 PM
                      </p>
                      <p>
                        <strong>Dinner Delivery:</strong> 6:00 PM - 9:00 PM
                      </p>
                      <p>
                        <strong>WhatsApp:</strong> 24/7 Quick Response
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded">
                  <h4 className="font-semibold text-primary-800 mb-2">
                    🚚 Free Delivery
                  </h4>
                  <p className="text-primary-700 text-sm">
                    Enjoy complimentary delivery on all orders throughout our
                    service area. No minimum order required!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="card">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Don't see your question here?</p>
            <a href="tel:+919627669554" className="btn btn-primary">
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      {/* Popup for Success/Error Messages */}
      {submitStatus.type && (
        <div className="fixed top-4 right-4 z-50 animate-slide-in">
          <div
            className={`p-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm ${
              submitStatus.type === 'success'
                ? 'bg-green-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {submitStatus.type === 'success' ? (
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-6 h-6 flex-shrink-0" />
            )}
            <p className="text-sm">{submitStatus.message}</p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}