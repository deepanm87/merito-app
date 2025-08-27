import LoggedInNav from "@/components/common/loggedin-nav"

export default function LoggedInLayout({
    children
}: { children: React.ReactNode}) {
    return (
        <div className="min-h-screen bg-gray-50">
            <LoggedInNav />
            <main> {children}</main>
        </div>
    )
}