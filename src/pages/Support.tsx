import { useState } from "react";
// import { useNavigate, Link } from "react-router";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Is AiBuddie free?",
    answer:
      "AiBuddie has a pay as you go tier with 24-hour data retention. If you need API access or longer data retention, this plan may not be for you.",
  },
  {
    question: "How does AiBuddie compare to other AI apps?",
    answer:
      "AiBuddie consolidates note-taking, storage, and AI assistance into one platform—reducing friction and app switching.",
  },
  {
    question: "What are AiBuddie credits?",
    answer:
      "Yes — you can invite team members, share files, and collaborate on notes and projects in real-time.",
  },
  {
    question: "What is Buddies monetization?",
    answer:
      "You earn a commission between 15% to 50% when users use your buddies",
  },
];

export function Support() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  //   const { login } = useAuthStore();
  //   const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log(name, email);
      //   await login(email, password);
      //   navigate("/dashboard");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as Record<string, any>;
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="mt-8 w-full max-w-md">
          <div className="text-center mb-8">
            {/* <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold">AiBuddie</h1>
            </div> */}
            <h2 className="text-5xl font-semibold">Contact</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Get help from support or read our faqs.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-950 p-8 rounded-lg border">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email (Ideally used in AiBuddie)
                </label>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  //   type="password"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-900"
                  required
                >
                  <option>Billing</option>
                  <option>Technical support</option>
                  <option>Report a bug</option>
                  <option>Feature request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  How can we help?
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="For bug reports, please include steps to reproduce the issue if possible"
                  className="w-full h-24 px-4 py-2 border rounded-md bg-white dark:bg-gray-900"
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </div>
        </div>

        <div id="faqs" className="mt-8 py-8 w-full max-w-md">
          <div className="text-center mb-8">
            {/* <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="w-8 h-8 text-green-600" />
              <h1 className="text-2xl font-bold">AiBuddie</h1>
            </div> */}
            <h2 className="text-5xl font-semibold">FAQs</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Read our frequently asked questions, or check out the AiBuddie
              Documentation.
            </p>
          </div>

          {/* <section className="w-full max-w-2xl mx-auto py-16 px-4"> */}
          {faqs.map((item, index) => (
            <FAQCard
              key={index}
              item={item}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
          {/* </section> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function FAQCard({
  item,
  isOpen,
  onClick,
}: {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      className={`rounded-2xl bg-[#F5F5EF] dark:bg-[#0F0F0F] dark:text-gray-200 mb-4 transition-colors border ${
        isOpen ? "border-gray-800 shadow-sm" : "border-gray-700"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full cursor-pointer flex justify-between items-center text-left py-4 px-5"
      >
        <span className="font-medium text-[17px]">{item.question}</span>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-4 px-5 text-[15px] leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
