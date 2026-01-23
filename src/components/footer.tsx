export const Footer = () => {
  return (
    <footer className="border-t py-8 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} AiBuddie. All rights reserved.</p>
      </div>
    </footer>
  );
};
