export default function AuthLayout({
  title,
  subTitle,
  children,
}: {
  title: string;
  subTitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-orange-100 via-orange-50 to-white">
      <section className="relative mx-auto flex flex-col z-0 items-center justify-start min-h-screen py-12 lg:py-24 transition-all animate-in lg:px-12 duration-300">
        <div className="text-center mb-8">
          <h1 className="font-bold py-6 text-center text-3xl sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <h2 className="text-lg sm:text-xl px-4 text-center lg:px-0 lg:max-w-2xl text-gray-600">
            {subTitle}
          </h2>
        </div>
        <div className="flex justify-center">{children}</div>
      </section>
    </div>
  );
}
