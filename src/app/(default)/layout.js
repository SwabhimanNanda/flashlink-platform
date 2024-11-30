import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function DefaultLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
