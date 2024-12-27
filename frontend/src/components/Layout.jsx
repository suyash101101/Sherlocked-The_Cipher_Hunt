import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;

