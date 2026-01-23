import { Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuthStore } from "@/stores/authStore";
import { billingApi } from "@/lib/api";
import { Link, useNavigate } from "react-router";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const PLANS = [
  {
    name: "Starter",
    price: 15,
    credits: 5000,
    tier: "starter",
    features: [
      "5,000 AI credits",
      "Access to all AI Buddies",
      "Smart model routing",
      "Basic analytics",
      "7-day data retention",
      "Email support",
    ],
  },
  {
    name: "Pro",
    price: 39,
    credits: 15000,
    tier: "pro",
    popular: true,
    features: [
      "15,000 AI credits",
      "Priority model access",
      "Advanced analytics",
      "API access",
      "Priority support",
      "21-day data retention",
      "Custom buddies",
    ],
  },
  {
    name: "Business",
    price: 99,
    credits: 40000,
    tier: "business",
    features: [
      "40,000 AI credits",
      "Dedicated support",
      "Team collaboration",
      "Advanced API limits",
      "Custom integrations",
      "SLA guarantee",
    ],
  },
];

export function Pricing() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handlePurchase = async (tier: string) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await billingApi.createCheckout(tier);
      // window.location.href = data.url;
      return data;
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <NavBar />
      <div className="min-h-screen py-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Usage-Based Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Buy credits once, use them whenever you need AI assistance
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`p-8 rounded-lg border-2 ${
                plan.popular
                  ? "border-blue-600 shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="text-blue-600 font-semibold mb-2">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">${plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {" "}
                  monthly
                </span>
              </div>
              <div className="text-lg mb-6 text-gray-600 dark:text-gray-400">
                {plan.credits.toLocaleString()} credits
              </div>
              <Button
                onClick={async () => {
                  const result = await handlePurchase(plan.tier);
                  if (result?.url) {
                    window.location.href = result.url;
                  }
                }}
                className="w-full mb-6"
                variant={plan.popular ? "default" : "outline"}
              >
                Get Started
              </Button>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div
            className={`w-1/3 p-8 rounded-lg border-2 ${"border-gray-200 dark:border-gray-800"}`}
          >
            <h3 className="text-2xl font-bold mb-2">Pay as you go</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">$0</span>
              <span className="text-gray-600 dark:text-gray-400">
                {" "}
                one-time
              </span>
            </div>
            <div className="text-lg mb-6 text-gray-600 dark:text-gray-400">
              0 credits
            </div>
            <Link to="/register">
              {" "}
              <Button className="w-full mb-6" variant={"outline"}>
                Get Started
              </Button>
            </Link>

            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  Smart model routing
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">
                  24 hours data retention
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">How Credits Work</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Simple Tasks (1 credit)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Quick questions, basic writing, simple queries
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Medium Tasks (5 credits)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Creative writing, code generation, analysis
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Complex Tasks (15 credits)</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced reasoning, research, image generation
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
