import { Link } from "react-router";
import { Brain, Zap, Shield, TrendingUp, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  AvatarGroup,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroupCount,
} from "@/components/ui/avatar";

export function Landing() {
  return (
    <div className="min-h-screen">
      <NavBar />

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-5xl font-bold mb-6">
            Your AI Team for Every Task
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Access specialized AI assistants that automatically use the right
            model for your needs. Pay only for what you use with intelligent
            routing.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 cursor-pointer">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/buddies">
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 cursor-pointer"
              >
                Explore AI Buddies
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why AiBuddie?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-blue-600" />}
              title="Smart Routing"
              description="Automatically uses the most cost-effective AI model based on your task complexity"
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Pay Per Use"
              description="Buy credits and use them when you need AI assistance"
              // description="No subscriptions. Buy credits and use them when you need AI assistance"
            />
            <FeatureCard
              icon={<Users className="w-8 h-8 text-blue-600" />}
              title="Specialized Buddies"
              description="Pre-configured AI assistants for writing, coding, trading, design and more"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8 text-blue-600" />}
              title="Usage Analytics"
              description="Track your credit usage and see which buddies work best for you"
            />
            <FeatureCard
              icon={<Sparkles className="w-8 h-8 text-blue-600" />}
              title="Latest Models"
              description="Access GPT-4, Claude Opus, and other cutting-edge AI models"
            />
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="Context Aware"
              description="Maintains conversation history for coherent multi-turn interactions"
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            Join thousands using AiBuddie to supercharge their productivity
          </p>
          <div className="mb-8 flex justify-center">
            <AvatarGroup className="grayscale">
              <Avatar>
                <AvatarImage
                  src="https://github.com/geekygeeky.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/devwraithe.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/maxleiter.png"
                  alt="@maxleiter"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarImage
                  src="https://github.com/evilrabbit.png"
                  alt="@evilrabbit"
                />
                <AvatarFallback>ER</AvatarFallback>
              </Avatar>
              <AvatarGroupCount style={{ padding: "18px" }}>
                <span className="text-xs">+100</span>
              </AvatarGroupCount>
            </AvatarGroup>
          </div>
          <Link to="/register">
            <Button size="lg" className="text-lg px-8 h-12 cursor-pointer">
              Start with 100 Free Credits
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
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
    <div className="p-6 bg-white dark:bg-gray-950 rounded-lg border">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}
