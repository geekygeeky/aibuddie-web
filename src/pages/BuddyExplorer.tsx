import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import { buddyApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function BuddyExplorer() {
  const { data: buddies, isLoading } = useQuery({
    queryKey: ["buddies"],
    queryFn: async () => {
      const { data } = await buddyApi.getAll();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <NavBar />
        <div className="p-8 text-center">Loading buddies...</div>
      </div>
    );
  }

  const categories = [...new Set(buddies?.map((b) => b.category))];

  return (
    <div className="min-h-screen">
      <NavBar />
      <div className="container py-12 px-4 mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold mb-8">Explore AI Buddies</h1>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 capitalize">
              {category}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {buddies
                ?.filter((b) => b.category === category)
                .map((buddy) => (
                  <div
                    key={buddy.id}
                    className="p-6 border rounded-lg hover:shadow-lg transition-shadow bg-white dark:bg-gray-950"
                  >
                    <div className="text-4xl mb-4">{buddy.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{buddy.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {buddy.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {buddy.usageCount.toLocaleString()} uses
                      </span>
                      <Link to={`/chat/${buddy.slug}`}>
                        <Button size="sm">
                          <Sparkles className="w-4 h-4 mr-2" />
                          Start Chat
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
}
