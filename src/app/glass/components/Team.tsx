'use client'
import { motion } from "framer-motion";

const Team = () => {
  const teamMembers = [
    {
      name: "John Doe",
      role: "CEO",
      avatar: "/placeholder1.png",
    },
    {
      name: "Jane Smith",
      role: "CTO",
      avatar: "/placeholder2.png",
    },
    {
      name: "Peter Jones",
      role: "CFO",
      avatar: "/placeholder3.png",
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-white text-center"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
              <p className="text-lg">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
