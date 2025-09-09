import LoggedInNav from "@/components/common/loggedin-nav";
import Footer from "@/components/common/footer";

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <LoggedInNav />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
