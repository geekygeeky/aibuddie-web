import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Check, Info } from "lucide-react";
import clsx from "clsx";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { billingApi } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const PLANS = [
  {
    name: "Starter",
    tier: "starter",
    monthly: 29.99,
    yearly: 120,
    credits: 8000,
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
    tier: "pro",
    popular: true,
    monthly: 39,
    yearly: 350,
    credits: 15000,
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
    name: "Ultra",
    tier: "ultra",
    monthly: 99,
    yearly: 800,
    credits: 40000,
    features: [
      "40,000 AI credits",
      "Dedicated support",
      // "Team collaboration",
      "Advanced API limits",
      "Custom integrations",
      "Buddies monetization",
      "SLA guarantee",
    ],
  },
];
export function Pricing() {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const [creditInput, setCreditInput] = useState<number>(250);

  const dollarValue = useMemo(() => {
    // PAYG: 250 credits = $1 → (credits / 250) dollars
    return Math.max(0, creditInput / 250);
  }, [creditInput]);

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
    <div className="flex flex-col">
      <NavBar />
      <TooltipProvider>
        <div className="min-h-screen max-w-6xl mx-auto pt-20 px-4">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl font-bold mb-3">
              Simple, Usage-Based Pricing
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Pay only for what you use with intelligent model routing.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <span
              className={clsx(
                "text-sm",
                billing === "monthly" ? "font-semibold" : "text-gray-500",
              )}
            >
              Monthly
            </span>

            <button
              onClick={() =>
                setBilling(billing === "monthly" ? "yearly" : "monthly")
              }
              className="cursor-pointer relative w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center"
            >
              <div
                // layout
                className={clsx(
                  "w-6 h-6 rounded-full shadow-md transition",
                  billing === "yearly" ? "bg-green-500" : "bg-white",
                )}
                // "w-6 h-6 rounded-full bg-white shadow-md transition"
                // transition={{ type: "spring", stiffness: 400, damping: 30 }}
                style={{
                  transform:
                    billing === "yearly"
                      ? "translateX(36px)"
                      : "translateX(4px)",
                }}
              />
            </button>

            <div className="flex items-center gap-1">
              <span
                className={clsx(
                  "text-sm",
                  billing === "yearly" ? "font-semibold" : "text-gray-500",
                )}
              >
                Yearly
              </span>
              {/* Savings Tooltip */}
              <Tooltip>
                <TooltipTrigger>
                  <Info size={14} className="text-gray-400 cursor-pointer" />
                </TooltipTrigger>
                <TooltipContent className="text-sm p-2">
                  Save up to 30% with yearly billing
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* PLANS */}
          <div className="grid md:grid-cols-3 gap-8">
            {PLANS.map((plan) => {
              const price = billing === "monthly" ? plan.monthly : plan.yearly;
              const suffix = billing === "monthly" ? "/mo" : "/yr";
              const yearlySavings =
                billing === "yearly"
                  ? Math.round(
                      ((plan.monthly * 12 - plan.yearly) /
                        (plan.monthly * 12)) *
                        100,
                    )
                  : null;

              return (
                <div
                  key={plan.tier}
                  className={clsx(
                    "p-8 rounded-lg border-2 transition transform",
                    plan.popular
                      ? "border-green-600 shadow-xl scale-105"
                      : "border-gray-200 dark:border-gray-800",
                  )}
                >
                  {plan.popular && (
                    <div className="text-green-600 font-semibold mb-2 text-sm tracking-wide">
                      MOST POPULAR
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                  <div className="mb-3">
                    <span className="text-4xl font-bold">${price}</span>
                    <span className="text-gray-600 dark:text-gray-400 ml-1 text-base">
                      {suffix}
                    </span>
                  </div>

                  {yearlySavings && (
                    <div className="text-xs text-green-600 mb-4">
                      Save {yearlySavings}% annually
                    </div>
                  )}

                  <div className="text-lg mb-6 text-gray-600 dark:text-gray-400">
                    {billing === "monthly"
                      ? plan.credits.toLocaleString()
                      : (plan.credits * 10).toLocaleString()}{" "}
                    credits
                  </div>

                  <Button
                    onClick={async () => {
                      const result = await handlePurchase(plan.tier);
                      // const result = await handlePurchase(plan.tier, billing);
                      if (result?.url) window.location.href = result.url;
                    }}
                    className="w-full mb-6"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>

                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          {/* PAY AS YOU GO */}
          <div className="mt-12 flex justify-center">
            <div className="w-full md:w-1/2 p-8 rounded-lg border-2 border-gray-200 dark:border-gray-800">
              <h3 className="text-2xl font-bold mb-3">Pay as you go</h3>

              <Tooltip>
                <TooltipTrigger>
                  <div className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex items-center gap-1">
                    300 credits = $1 (billed on demand)
                    <Info size={14} className="text-gray-400 cursor-pointer" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="text-sm p-2">
                  Purchase small packs of credits anytime you need them.
                </TooltipContent>
              </Tooltip>

              <Link to="/register">
                <Button className="w-full mb-6" variant={"outline"}>
                  Buy Credits
                </Button>
              </Link>

              {/* OPTIONS */}
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <div>Smart model routing</div>
                <div>24-hour data retention</div>
              </div>

              {/* CALCULATOR */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="text-sm font-semibold mb-2">
                  Credit calculator
                </div>
                <input
                  type="number"
                  value={creditInput}
                  onChange={(e) =>
                    setCreditInput(parseInt(e.target.value) || 0)
                  }
                  className="w-full border rounded-md p-2 dark:bg-gray-900"
                  placeholder="Enter credits (e.g. 900)"
                />
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  ≈{" "}
                  <span className="font-semibold">
                    ${dollarValue.toFixed(2)}
                  </span>{" "}
                  USD
                </div>
              </div>
            </div>
          </div>
        </div>
      </TooltipProvider>
      <div className="max-w-6xl mx-auto my-16 p-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h3 className="text-2xl font-bold mb-4">How Credits Work</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">
              Simple Tasks (2 - 100 credits)
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Quick questions, basic writing, simple queries, web surfing, content search
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              Medium Tasks (100 - 1,000 credits)
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Creative writing, code generation, content analysis, image generation
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">
              Complex Tasks (1000+ credits)
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Advanced reasoning, research, high quality image generation, video generation
            </p>
          </div>
        </div>
      </div>
      {/* <div className="min-h-screen max-w-6xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Usage-Based Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Pay only for what you use with intelligent routing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <div
              key={plan.tier}
              className={`p-8 rounded-lg border-2 ${
                plan.popular
                  ? "border-green-600 shadow-lg scale-105"
                  : "border-gray-200 dark:border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="text-green-600 font-semibold mb-2">
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
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
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
      </div> */}
      <Footer />
    </div>
  );
}
