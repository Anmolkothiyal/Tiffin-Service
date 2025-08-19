"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Filter, Phone } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Meal {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  components: {
    rotis: number;
    curries: number;
    rice: number;
    salad: number;
  };
  image: string;
  category: string;
  popular: boolean;
  stockLeft: number;
}

export default function PlansPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.meals || []);
        setFilteredMeals(data.meals || []);
      })
      .catch(() => {
        // Fallback static data
        const fallbackMeals = [
          {
            id: 1,
            name: "Mini Meal",
            price: 159,
            originalPrice: 169,
            description: "Perfect for light appetite with authentic flavors",
            components: { rotis: 3, curries: 2, rice: 0, salad: 1 },
            image: "/images/mini-meal.jpg",
            category: "budget",
            popular: false,
            stockLeft: 50,
          },
          {
            id: 2,
            name: "King's Feast",
            price: 199,
            description:
              "Our most popular meal with generous portions and variety",
            components: { rotis: 5, curries: 2, rice: 1, salad: 1 },
            image: "/images/kings-feast.jpg",
            category: "popular",
            popular: true,
            stockLeft: 30,
          },
        ];
        setMeals(fallbackMeals);
        setFilteredMeals(fallbackMeals);
      });
  }, []);

  const filters = ["All", "Popular", "Budget", "Premium"];

  const handleFilter = (filter: string) => {
    setActiveFilter(filter);
    if (filter === "All") {
      setFilteredMeals(meals);
    } else {
      const filtered = meals.filter((meal) => {
        if (filter === "Popular") return meal.popular;
        return meal.category.toLowerCase() === filter.toLowerCase();
      });
      setFilteredMeals(filtered);
    }
  };

  const formatComponents = (components: Meal["components"]) => {
    const parts = [];
    if (components.rotis) parts.push(`${components.rotis} Rotis`);
    if (components.curries) parts.push(`${components.curries} Curries`);
    if (components.rice) parts.push(`${components.rice} Rice`);
    if (components.salad) parts.push(`${components.salad} Salad`);
    return parts.join(" • ");
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 pb-12 gradient-bg text-white">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Our Plans & Menu
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto">
            Choose from our variety of authentic Indian tiffin plans, crafted
            with love and delivered fresh daily
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white sticky top-16 z-40 border-b border-gray-200">
        <div className="container">
          <div className="flex items-center justify-center gap-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilter(filter)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-primary-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meals Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div
                key={meal.id}
                className="card group hover:shadow-2xl transition-all duration-300">
                {meal.popular && (
                  <div className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">
                    ⭐ Most Popular
                  </div>
                )}

                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-primary-600 text-white px-2 py-1 rounded-md text-sm font-semibold">
                    {meal.stockLeft} left
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {meal.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3">
                  {formatComponents(meal.components)}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-600">
                    ${meal.price}
                  </span>
                  {meal.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ${meal.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-6 flex-grow">
                  {meal.description}
                </p>

                <a href="tel:+919627669554" className="btn btn-primary w-full">
                  <Phone className="w-4 h-4" />
                  Call to Order
                </a>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Questions? Tap to call +91 96276 69554
                </p>
              </div>
            ))}
          </div>

          {filteredMeals.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No meals found
              </h3>
              <p className="text-gray-500">
                Try adjusting your filter or check back later for new meals.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Custom Plan CTA */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="text-center bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Plan?</h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Can't find what you're looking for? We create personalized meal
              plans just for you!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+919627669554"
                className="btn bg-white text-primary-600 hover:bg-gray-50 font-semibold text-lg px-8 py-4">
                <Phone className="w-5 h-5" />
                Call for Custom Plan
              </a>
              <a
                href="https://wa.me/+919627669554"
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold text-lg px-8 py-4">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
