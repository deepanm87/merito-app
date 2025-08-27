import AuthLayout from "@/components/auth/auth-layout"
import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
    return (
        <AuthLayout title="Sign In" subTitle="Access your dashboard and manage your testimonials">
            <SignIn />
        </AuthLayout>
    )
}