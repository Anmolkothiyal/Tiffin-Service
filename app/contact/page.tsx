"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend
    alert("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
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
      value: "+1 867 888 2293",
      action: "tel:+18678882293",
      available: "Mon - Sun: 8:00 AM - 10:00 PM",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      description: "Quick and easy messaging",
      value: "Chat with us",
      action: "https://wa.me/18678882293",
      available: "24/7 Quick Response",
    },
    {
      icon: Mail,
      title: "Email",
      description: "Send us detailed inquiries",
      value: "info@yaanitiffin.com",
      action: "mailto:info@yaanitiffin.com",
      available: "Response within 24 hours",
    },
  ];

  const serviceAreas = [
    "Toronto",
    "Mississauga",
    "Brampton",
    "Scarborough",
    "Markham",
    "Richmond Hill",
    "Vaughan",
    "Oakville",
    "Burlington",
    "Milton",
    "Etobicoke",
    "North York",
  ];

  const faqs = [
    {
      question: "What are your delivery hours?",
      answer:
        "We deliver fresh meals daily between 11:00 AM - 2:00 PM for lunch and 6:00 PM - 9:00 PM for dinner.",
    },
    {
      question: "How far in advance should I place my order?",
      answer:
        "We recommend placing orders at least 24 hours in advance to ensure availability, but we also accept same-day orders based on capacity.",
    },
    {
      question: "Do you accommodate dietary restrictions?",
      answer:
        "Yes! We can customize meals for dietary restrictions including vegetarian, vegan, gluten-free, and low-sodium options. Please mention your requirements when ordering.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "You can cancel or modify your order up to 12 hours before the scheduled delivery time for a full refund.",
    },
    {
      question: "Do you offer bulk orders for events?",
      answer:
        "Absolutely! We cater to events, parties, and corporate functions. Contact us at least 48 hours in advance for bulk orders.",
    },
  ];

  return (
    <main className="min-h-screen">
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-full btn-large">
                  <Send className="w-5 h-5" />
                  Send Message
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
                      We deliver throughout the Greater Toronto Area (GTA)
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
            <a href="tel:+18678882293" className="btn btn-primary">
              <Phone className="w-4 h-4" />
              Call Us Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
