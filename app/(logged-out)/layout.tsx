import Header from "@/components/common/header"
import Footer from "@/components/common/footer"

export default function LoggedOutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    )
}