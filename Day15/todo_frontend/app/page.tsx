import { Header } from "./component/header";
import { Footer } from "./component/footer";
import { TodoList } from "./component/todo-list";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
                <Sparkles className="h-4 w-4" />
                <span>Simple. Elegant. Powerful.</span>
              </div>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Organize your tasks
                <br />
                <span className="text-accent">effortlessly</span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                A beautifully crafted todo app that helps you stay focused and
                productive. No clutter, just what you need.
              </p>
            </div>
          </div>
        </section>

        {/* Todo App Section */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <TodoList />
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-border bg-card/50 py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Lightning Fast
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Add, complete, and organize tasks instantly with zero lag or
                  delays.
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Stay Focused
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Clean interface keeps you focused on what matters most.
                </p>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent/50 sm:col-span-2 lg:col-span-1">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                  <svg
                    className="h-6 w-6 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  Track Progress
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Visual progress tracking keeps you motivated and on track.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
