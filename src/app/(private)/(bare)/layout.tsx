import { Navbar } from "@/components/layout/navbar/navbar";
import { Footer } from "@/components/layout/footer";

export default function BareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
