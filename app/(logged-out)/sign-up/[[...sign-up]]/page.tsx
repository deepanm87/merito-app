import AuthLayout from "@/components/auth/auth-layout"
import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
    return (
        <AuthLayout title="Sign Up" subTitle="Create an account to get started">
            <SignUp />
        </AuthLayout>
    )
}