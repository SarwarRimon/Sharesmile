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
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-blue-700">What Our Supporters Say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 shadow-lg rounded-lg"
            >
              <p className="italic text-gray-600">"{testimonial.quote}"</p>
              <p className="mt-4 font-semibold text-blue-700">{testimonial.name}</p>
              <p className="text-gray-500">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
