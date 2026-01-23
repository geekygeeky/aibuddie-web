import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { Coins, TrendingUp, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import { NavBar } from "@/components/navbar";

export function Dashboard() {
  const { user } = useAuthStore();

  //   const { isLoading, user, error } = db.useAuth();

  const { data: stats } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await api.get("/admin/stats");
      return data;
    },
  });

  const { data: conversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      const { data } = await api.get("/chat/conversations");
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <NavBar />

      <div className="container p-8 mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your AI buddies and track your usage
            </p>
          </div>
          <Link to="/buddies">
            <Button>
              <Sparkles className="w-4 h-4 mr-2" />
              My Buddies
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white dark:bg-gray-950 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Coins className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Available Credits</h3>
            </div>
            <p className="text-3xl font-bold">
              {user?.credits.toLocaleString()}
            </p>
            <Link to="/pricing">
              <Button variant="outline" size="sm" className="mt-4">
                Buy More Credits
              </Button>
            </Link>
          </div>

          <div className="p-6 bg-white dark:bg-gray-950 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Total Usage</h3>
            </div>
            <p className="text-3xl font-bold">
              {stats?.totalCreditsUsed?.toLocaleString() || 0}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Credits used all time
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-gray-950 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Plan</h3>
            </div>
            <p className="text-3xl font-bold capitalize">
              {user?.subscriptionTier}
            </p>
            <Link to="/pricing">
              <Button variant="outline" size="sm" className="mt-4">
                Upgrade Plan
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-4 bg-white dark:bg-gray-950 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Conversations</h2>
          <div className="space-y-3">
            {conversations?.map((conversation: any) => (
              <Link
                to={`/chat/${conversation.buddy.slug}`}
                // to={`/chat/${conversation.buddy.slug}/${conversation.id}`}
                state={conversation.id}
                className="block"
              >
                <div
                  key={conversation.id}
                  className="flex items-center justify-between p-3 rounded border"
                >
                  <span className="font-medium">{conversation.title}</span>
                  {/* <span className="font-medium">{conversation.buddy.slug}</span> */}
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(conversation.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-4 bg-white dark:bg-gray-950 rounded-lg border p-6">
          <h2 className="text-xl font-semibold mb-4">Most Used Buddies</h2>
          <div className="space-y-3">
            {stats?.topBuddies?.map((buddy: any) => (
              <div
                key={buddy.id}
                className="flex items-center justify-between p-3 rounded border"
              >
                <span className="font-medium">{buddy.name}</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {buddy.usageCount.toLocaleString()} uses
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
