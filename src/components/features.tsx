import { motion } from "framer-motion";
import { Zap, Shield, Users, TrendingUp, Sparkles, Brain } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-green-500" />,
      title: "Smart Routing",
      description:
        "Automatically uses the most cost-effective AI model based on your task complexity",
    },
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Pay Per Use",
      description: "Buy credits and use them when you need AI assistance",
    },
    {
      icon: <Users className="w-6 h-6 text-green-500" />,
      title: "Specialized Buddies",
      description:
        "Pre-configured AI assistants for writing, coding, trading, design and more",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-500" />,
      title: "Usage Analytics",
      description:
        "Track your credit usage and see which buddies work best for you",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-green-500" />,
      title: "Latest Models",
      description:
        "Access GPT-4, Claude Opus, and other cutting-edge AI models",
    },
    {
      icon: <Brain className="w-6 h-6 text-green-500" />,
      title: "Context Aware",
      description:
        "Maintains conversation history for coherent multi-turn interactions",
    },
  ];

  return (
    <section className="relative py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-4"
        >
          Why AiBuddie?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
        >
          Context aware and personalized toolkit with zero config. Just describe
          what you want and let AI handle the rest.
        </motion.p>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        show: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className="p-6 bg-white/60 dark:bg-gray-950/40 border border-gray-200/40 dark:border-gray-800/50 
                 backdrop-blur-md shadow-sm rounded-xl hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
