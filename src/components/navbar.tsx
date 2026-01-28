import { Brain } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { useAuthStore } from "@/stores/authStore";
import { ModeToggle } from "./mode-toggle";
// import { MoonIcon, SunIcon } from "@phosphor-icons/react";

export const NavBar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <nav
      className="w-full relative z-10 border-b-0 bg-transparent"
      // className="border-b bg-green-light dark:bg-green-dark"
      // style={{ backgroundImage: "url('/noise.svg')" }}
    >
      {/* <div className="absolute hidden dark:block inset-0 bg-green-dark-2/80"></div> */}

      <div className="z-10 relative container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Brain className="w-6 h-6 texts-light" />
            AiBuddie
          </div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/support">
            {/* 1. why AIbuddie 2. contact/support 3. FAQ with ID hash */}
            <Button variant="ghost" className="cursor-pointer">
              Support
            </Button>
          </Link>
          <Link to="/buddies">
            <Button
              variant="ghost"
              className="cursor-pointer text-wshite px-6 py-2 rounded-md transition"
            >
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
                <Button className="cursor-pointer text-white bg-linear-to-r bg-green-light-1 hover:from-green-dark-1 hover:to-green-dark-1 transition">
                  Get Started
                </Button>
              </Link>
            </>
          )}
          <ModeToggle />
          {/* <button
            onClick={toggleTheme}
            className="cursor-pointer p-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            // {theme === "dark" ? "🌙 Dark" : "☀️ Light"} 
          </button> */}
        </div>
      </div>
    </nav>
  );
};
