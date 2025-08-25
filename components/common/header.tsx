import Link from "next/link"

export default function Header() {

    const isSignedIn = false

    const navLinks = [
        {
            href: "#features",
            label: "Features"
        },
        {
            href: "#pricing",
            label: "Pricing"
        },
        ...(isSignedIn ? [{ href: "/dashboard",
            label: "Dashboard"
        }] : [])
    ]

    const navLinkElements = navLinks.map( ({href, label }) => (
        <Link 
            href={href} 
            key={label}
            className="text-sm font-medium hover:underline underline-offset-4"
        >
            {label}
        </Link>
    ))

    return (
        <header className="px-4 lg:px-6 h-14 flex items-center">
            <div className="w-full mx-auto flex items-center justify-content container px-4">
                <Link 
                    href="/" 
                    className="flex items-center justify-center"
                >
                    <h1 className="font-serif">Merito</h1>
                </Link>
                <nav className="flex items-center gap-4">
                    {navLinkElements}
                    { isSignedIn ? ( <></>) : (
                        <Link 
                            href="/sign-in"
                            className="text-sm font-medium hover:underline underline-offset-4"
                        >
                            Sign In
                        </Link>
                    )}
                </nav>
            </div>  
        </header>
    )
}