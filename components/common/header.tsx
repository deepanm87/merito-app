import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const isSignedIn = true;
  const navLinks = [
    {
      href: "#features",
      label: "Features",
    },
    {
      href: "#pricing",
      label: "Pricing",
    },
    ...(isSignedIn ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <div className="w-full mx-auto flex items-center justify-between container px-4">
        <Link href="/" className="flex items-center justify-center">
          <h1 className="font-serif text-xl font-bold">Merito</h1>
        </Link>
        <nav className="flex items-center gap-4">
          {navLinks.map(({ href, label }) => (
            <Link
              href={href}
              key={label}
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              {label}
            </Link>
          ))}

          <SignedIn>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Sign In
            </Link>
          </SignedOut>
        </nav>
      </div>
    </header>
  );
}
