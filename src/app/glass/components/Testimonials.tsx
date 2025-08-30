'use client';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      role: "CEO, TechCorp",
      testimonial: "This is the most intuitive and beautifully designed platform I have ever used. It has transformed our workflow.",
      rating: 5,
    },
    {
      name: "Samantha Lee",
      role: "Lead Designer, Creative Solutions",
      testimonial: "The fluidity and clarity of the interface are simply breathtaking. It's a game-changer for our creative process.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Project Manager, Innovate Inc.",
      testimonial: "A stunning and lightweight design that our entire team loves. It has significantly improved our productivity.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                ))}
              </div>
              <p className="text-gray-200 mb-6 italic">"{testimonial.testimonial}"</p>
              <div>
                <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                <p className="text-gray-300">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
