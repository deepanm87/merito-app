import Footer from "@/components/common/footer";

export default function LoggedOutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <main>{children}</main>
      <Footer />
    </div>
  );
}
