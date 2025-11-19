import React from "react";
import { NavLink } from "react-router-dom";

const About = () => {
  const stats = [
    { number: "10K+", label: "Happy Customers" },
    { number: "500+", label: "Restaurants" },
    { number: "50+", label: "Cities" },
    { number: "24/7", label: "Support" },
  ];

  const values = [
    {
      icon: "🍽️",
      title: "Quality Food",
      description:
        "We partner with the best restaurants to ensure you get fresh, delicious meals every time.",
    },
    {
      icon: "⚡",
      title: "Fast Delivery",
      description:
        "Get your favorite food delivered to your doorstep in record time with our efficient delivery network.",
    },
    {
      icon: "💳",
      title: "Easy Payment",
      description:
        "Multiple payment options including cash, cards, and digital wallets for a seamless experience.",
    },
    {
      icon: "⭐",
      title: "Top Rated",
      description:
        "Rated 4.8+ stars by thousands of satisfied customers across the country.",
    },
  ];

  const features = [
    {
      icon: "🔍",
      title: "Discover",
      description:
        "Explore a wide variety of cuisines and restaurants in your area.",
    },
    {
      icon: "📱",
      title: "Order",
      description:
        "Place your order with just a few taps on our user-friendly platform.",
    },
    {
      icon: "🚀",
      title: "Enjoy",
      description:
        "Sit back and relax while we deliver your favorite meals to you.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About Rapid Eats
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-95">
              Your trusted food delivery partner, bringing delicious meals from
              your favorite restaurants right to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                At Food Panda, we believe that great food should be accessible
                to everyone, everywhere. Our mission is to connect food lovers
                with their favorite restaurants and cuisines, making it easier
                than ever to enjoy delicious meals at home or work.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We're committed to providing exceptional service, supporting
                local restaurants, and ensuring that every order is delivered
                with care and attention to detail.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-red-400 to-red-600 rounded-2xl p-8 text-white shadow-2xl">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-lg opacity-95">
                  To become the most trusted and loved food delivery platform,
                  creating memorable dining experiences for millions of
                  customers while supporting local businesses and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best food delivery experience
              with these core values
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-red-200"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting your favorite food delivered is simple and easy
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-red-50 hover:to-red-100 transition-all duration-300"
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {index + 1}. {feature.title}
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Order?
          </h2>
          <p className="text-xl text-white opacity-95 mb-8">
            Join thousands of satisfied customers and start ordering your
            favorite meals today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/"
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl text-center"
            >
              Browse Restaurants
            </NavLink>
            <NavLink
              to="/contact"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-600 transition-colors duration-200 text-center"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
