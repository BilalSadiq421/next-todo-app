import Footer from "./footer/Footer";
import Navbar from "./navigation/Navbar";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
