import { SignedIn, UserButton } from "@clerk/nextjs"
import Link from "next/link"

export default function LoggedInNav() {
    return (
        <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-white">
            <div className="w-full mx-auto flex items-center justify-between container py-4">
                <Link href="/" className="flex items-center justify-center">
                    <h1 className="font-serif text-xl font-bold">Merito</h1>
                </Link>
                <nav className="flex items-center gap-4">
                    <SignedIn>
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-gray-600 hover:underline underline-offset-4 hover:text-gray-900"
                        >   
                            Dashboard
                        </Link>
                        <UserButton />
                    </SignedIn>
                </nav>
            </div>
        </header>
    )
}