import Header from "@/components/common/header"

export default function LoggedOutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {children}
        </div>
    )
}