'use client'
import { motion } from "framer-motion";

const Pricing = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Pricing Plans
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Pricing Card 1 */}
          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-white text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4">Basic</h3>
            <p className="text-4xl font-bold mb-6">$10</p>
            <ul className="text-lg mb-8">
              <li className="mb-2">Feature 1</li>
              <li className="mb-2">Feature 2</li>
              <li className="mb-2">Feature 3</li>
            </ul>
            <button className="bg-cyan-400 text-white font-bold py-2 px-4 rounded-full">
              Choose Plan
            </button>
          </motion.div>
          {/* Pricing Card 2 */}
          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-white text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4">Pro</h3>
            <p className="text-4xl font-bold mb-6">$20</p>
            <ul className="text-lg mb-8">
              <li className="mb-2">Feature 1</li>
              <li className="mb-2">Feature 2</li>
              <li className="mb-2">Feature 3</li>
              <li className="mb-2">Feature 4</li>
            </ul>
            <button className="bg-cyan-400 text-white font-bold py-2 px-4 rounded-full">
              Choose Plan
            </button>
          </motion.div>
          {/* Pricing Card 3 */}
          <motion.div
            className="p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg text-white text-center"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <p className="text-4xl font-bold mb-6">$30</p>
            <ul className="text-lg mb-8">
              <li className="mb-2">Feature 1</li>
              <li className="mb-2">Feature 2</li>
              <li className="mb-2">Feature 3</li>
              <li className="mb-2">Feature 4</li>
              <li className="mb-2">Feature 5</li>
            </ul>
            <button className="bg-cyan-400 text-white font-bold py-2 px-4 rounded-full">
              Choose Plan
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
