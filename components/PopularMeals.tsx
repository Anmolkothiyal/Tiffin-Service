"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

export default function PopularMeals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    // In a real Next.js app, this would be fetched from API route
    fetch("/api/meals")
      .then((res) => res.json())
      .then((data) => {
        // Show only popular meals on homepage
        setMeals(data.meals.filter((meal: Meal) => meal.popular).slice(0, 3));
      })
      .catch(() => {
        // Fallback static data
        const fallbackMeals = [
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
          {
            id: 3,
            name: "King's Feast Deluxe",
            price: 229,
            description:
              "Enhanced version of our popular feast with extra curries",
            components: { rotis: 5, curries: 3, rice: 1, salad: 1 },
            image: "/images/kings-feast-deluxe.jpg",
            category: "premium",
            popular: true,
            stockLeft: 25,
          },
        ];
        setMeals(fallbackMeals);
      });
  }, []);

  const formatComponents = (components: Meal["components"]) => {
    const parts = [];
    if (components.rotis) parts.push(`${components.rotis} Rotis`);
    if (components.curries) parts.push(`${components.curries} Curries`);
    if (components.rice) parts.push(`${components.rice} Rice`);
    if (components.salad) parts.push(`${components.salad} Salad`);
    return parts.join(" • ");
  };

  return (
    <section id="meals" className="section-padding bg-gray-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Popular Meals
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From mini meals to royal feasts, we have something for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="card group hover:shadow-2xl transition-all duration-300">
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

              <p className="text-gray-600 mb-6">{meal.description}</p>

              <a href="tel:+18678882293" className="btn btn-primary w-full">
                <Phone className="w-4 h-4" />
                Call to Order
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/plans" className="btn btn-primary btn-large">
            View All Plans & Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
