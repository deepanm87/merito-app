import AuthLayout from "@/components/auth/auth-layout";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Sign up"
      subTitle="Create your account and start collecting testimonials"
    >
      <SignUp />
    </AuthLayout>
  );
}
