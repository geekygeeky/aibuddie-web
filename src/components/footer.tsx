import { Link } from "react-router";
import {
  XLogoIcon,
  InstagramLogoIcon,
  HandCoinsIcon,
} from "@phosphor-icons/react";
import Logo from "@/assets/logo-white.svg";

export const Footer = () => {
  return (
    <footer
      className="relative bg-gray-50 dark:bg-gray-900 z-10 w-full px-6 md:px-0 pt-4 pb-12 md:pt-12 md:pb-12"
      style={{ backgroundImage: "url('/noise.svg')" }}
    >
      <div className="absolute hidden dark:block inset-0 bg-green-dark-2/80"></div>
      <div className="py-12 z-50 relative w-full gap-y-4 max-w-6xl 2xl:max-w-7xl flex flex-col md:flex-row justify-between items-start md:items-end mx-auto">
        <div className="mt-6 md:mt-0 space-y-4">
          <Link to="/" className="block text-2xl font-extrabold font-cursive">
            <img
              src={Logo}
              alt="Banner"
              width={40} // approximate width for 40%, adjust as needed
              height={40} // adjust height proportionally
              className="invert dark:invert-0"
              // className="invert-0 dark:invert"
            />
          </Link>
          <p className="w-full max-w-md text-sm">
            Join thousands using AiBuddie to boost productivity through
            specialized AI assistants that automatically select the optimal
            model for each task.
          </p>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AiBuddie. All rights
            reserved.{" "}
          </p>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex gap-4 text-sm justify-between">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">AiBuddie</p>
              <Link to="/pricing">Pricing</Link>
              <Link to="/buddies">Explore buddies</Link>
              <Link to="/api-docs">API Docs</Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Help</p>
              <a href="https://x.com/aibuddie">Support</a>
              <Link to="/support#faqs">FAQs</Link>
              <Link to="/docs">Docs</Link>
            </div>

            <div className="flex flex-col gap-2">
              <p className="font-semibold">Legal</p>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms</Link>
            </div>
          </div>
          {/* Socials */}
          <div className="flex justify-between gap-4">
            <a
              href="https://x.com/AiBuddie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
            >
              <XLogoIcon
                size={18}
                className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
              />
              <span className="text-xs">@aibuddie</span>
            </a>

            <a
              href="https://instagram.com/aibuddie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
            >
              <InstagramLogoIcon
                size={18}
                className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
              />
              <span className="text-xs">Follow</span>
            </a>

            <a
              href="https://x.com/iamopking"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
            >
              <HandCoinsIcon
                size={18}
                className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition"
              />
              <span className="text-xs">Partnership / Enquiry</span>
            </a>

            {/* <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
                    >
                        <LinkedinLogoIcon size={18} className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition" />
                        <span className='text-xs'>LinkedIn</span>
                    </a> 
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
                    >
                        <InstagramLogoIcon size={18} className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition" />
                        <span className='text-xs'>Instagram</span>
                    </a>

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex justify-center items-center px-4 py-2 gap-1 rounded-full border border-gray-400 dark:border-gray-700 bg-app-white hover:bg-gray-100 dark:bg-app-black dark:hover:bg-[#1f2937] transition-colors"
                    >
                        <TiktokLogoIcon size={18} className="text-gray-800 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition" />
                        <span className='text-xs'>TikTok</span>
                    </a>
                    
                    */}
          </div>
        </div>
      </div>
    </footer>
  );
};
