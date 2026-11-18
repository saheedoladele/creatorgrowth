import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16">
      <section className="max-w-lg space-y-3 text-center">
        <h1 className="text-foreground text-3xl font-semibold tracking-tight">
          Welcome to Creator Growth Platform
        </h1>
        <p className="text-muted-foreground text-base leading-7">
          The frontend foundation is ready.
        </p>
        <p>
          <Link
            href="/dashboard"
            className="text-primary text-sm font-medium underline-offset-4 hover:underline"
          >
            Open the app
          </Link>
        </p>
      </section>
    </main>
  );
}
