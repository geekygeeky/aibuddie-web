import { Brain } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/authStore";

export const NavBar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="w-6 h-6 text-blue-600" />
            AiBuddie
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/pricing">
            <Button variant="ghost" className="cursor-pointer">
              Pricing
            </Button>
          </Link>
          <Link to="/buddies">
            <Button variant="ghost" className="cursor-pointer">
              Explore Buddies
            </Button>
          </Link>
          {user ? (
            <>
              {/* <Link to="/register"> */}
              <Button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="cursor-pointer"
              >
                Logout
              </Button>
              {/* </Link> */}
              <Link to="/dashboard">
                <Button variant="outline" className="cursor-pointer">
                  Dashboard
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="cursor-pointer">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="cursor-pointer">Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
