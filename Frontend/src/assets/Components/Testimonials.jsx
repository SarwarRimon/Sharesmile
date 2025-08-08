import React from "react";

const testimonials = [
  {
    id: 1,
    quote: "This organization made my donation experience seamless.",
    name: "John Doe",
    role: "Donor",
  },
  {
    id: 2,
    quote: "I love how transparent everything is with Helping Hands.",
    name: "Jane Smith",
    role: "Donor",
  },
  {
    id: 3,
    quote: "Helping Hands truly cares about the people in need.",
    name: "Mark Lee",
    role: "Volunteer",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            What Our Supporters Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300
                       border-2 border-purple-100 hover:border-purple-300 relative"
            >
              <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl">
                  "
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">"{testimonial.quote}"</p>
              <div className="pt-6 border-t border-purple-100">
                <p className="font-semibold text-lg text-purple-700">{testimonial.name}</p>
                <p className="text-gray-500 font-medium">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
