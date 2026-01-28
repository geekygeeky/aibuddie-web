import { Link } from "react-router";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import AvatarGroup from "@/components/avatar-group";
import Features from "@/components/features";

export function Landing() {
  return (
    <div
      className="relative z-10 min-h-screen"
      // style={{ backgroundImage: "url('/noise.svg')" }}
    >
      {/* <div className="absolute inset-0 bg-green-dark/90 opaci0"></div> */}

      {/*  background-color: #DFDBE5; */}
      <div
        className="relative z-50"
        style={{ backgroundImage: "url('/noise.svg')" }}
      >
        <NavBar />
        <div className="absolute hidden dark:block inset-0 bg-green-dark-2/80"></div>
        <section className="relative z-10 mt-0 md:mt-0 min-h-screen my-auto align-middle py-20 px-4 flex flex-col justify-center container mx-auto max-w-3xl bg-cover bg-center">
          {/* <div className="w-1/2"> */}
          {/* <div> */}
          <motion.h2
            className="font-tinos text-3xl md:text-7xl font-extrabold mb-2 md:mb-8 tsext-gradient leading-10 md:leading-20 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Specialized AI Buddies for Everything You Do
            {/* Modern AI Workflow <br /> */}
            {/* for Everyday Tasks */}
          </motion.h2>
          <motion.p
            className="px-12 md:px-24 text-lg text-gray-600 dark:text-gray-200 font-medium text-center mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Access specialized AI assistants that automatically use the right
            model for your needs.
          </motion.p>
          <div className="z-10 flex gap-6 justify-center">
            <Link to="/register">
              <Button
                size="lg"
                className="cursor-pointer rounded-4xl bg-green-dark-1 hover:bg-green-light-1 active:bg-dark-3 text-gray-50 text-lg h-12 px-8 transition"
              >
                Get 100 credits free
              </Button>
            </Link>
            <Link to="/buddies">
              <Button
                size="lg"
                // variant="outline"
                className="bg-transparent border border-white rounded-4xl text-black dark:text-white text-lg h-12 px-8 cursor-pointer"
              >
                Explore AI Buddies
              </Button>
            </Link>
          </div>
        </section>
      </div>

      {/* <section className="relative z-10 py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why AiBuddie?</h2>
          <p className="text-center mb-8 px-12 md:px-74">
            Context aware and personalized toolkit with zero config. Just
            describe what you want and let AI handle the rest.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-green-light-2" />}
              title="Smart Routing"
              description="Automatically uses the most cost-effective AI model based on your task complexity"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-light-2" />}
              title="Pay Per Use"
              description="Buy credits and use them when you need AI assistance"
              // description="No subscriptions. Buy credits and use them when you need AI assistance"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-green-light-2" />}
              title="Specialized Buddies"
              description="Pre-configured AI assistants for writing, coding, trading, design and more"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-green-light-2" />}
              title="Usage Analytics"
              description="Track your credit usage and see which buddies work best for you"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-green-light-2" />}
              title="Latest Models"
              description="Access GPT-4, Claude Opus, and other cutting-edge AI models"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-green-light-2" />}
              title="Context Aware"
              description="Maintains conversation history for coherent multi-turn interactions"
            />
          </div>
        </div>
      </section> */}

      <Features />

      <section className="relative py-28 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-gray-100/40 dark:via-gray-900/30 to-transparent pointer-events-none" />

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-tight mb-6"
          >
            Ready to get started?
          </motion.h2>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-6"
          >
            <AvatarGroup />
          </motion.div>

          {/* <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
          >
            Join thousands using AiBuddie to accelerate their productivity.
          </motion.p> */}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.22,
              type: "spring",
              stiffness: 200,
            }}
          >
            <Link to="/register">
              <Button
                size="lg"
                className="text-[17px] px-8 h-12 font-medium cursor-pointer tracking-tight"
              >
                Start with <strong>100 Free Credits</strong>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <AvatarGroup />
          <Link to="/register">
            <Button size="lg" className="text-[17px] px-8 h-12 cursor-pointer">
              Start with <strong>100</strong> Free Credits
            </Button>
          </Link>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}

// function FeatureCard({
//   icon,
//   title,
//   description,
// }: {
//   icon: React.ReactNode;
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="p-6 bg-white dark:bg-gray-950 rounded-lg border border-gray-100 dark:border-gray-800">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-lg font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600 dark:text-gray-400">{description}</p>
//     </div>
//   );
// }
