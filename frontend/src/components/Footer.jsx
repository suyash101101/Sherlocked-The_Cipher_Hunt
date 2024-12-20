function Footer() {
  const isLevel = location.pathname === '/level';

  if (isLevel) return null; // Hide Footer on Home page
  return (
    <footer className="bg-gray-800 p-4 text-center">
      <p className="text-white">&copy; 2025 Sherlocked: The Cipher Hunt. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

