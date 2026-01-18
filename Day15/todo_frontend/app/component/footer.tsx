import { CheckCircle2, Github, Twitter } from "lucide-react";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                                <CheckCircle2 className="h-5 w-5 text-accent-foreground" />
                            </div>
                            <span className="text-lg font-semibold text-foreground">
                                TaskFlow
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            The elegant way to manage your tasks and stay productive.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Product
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Changelog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Company
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Careers
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                            Connect
                        </h4>
                        <div className="flex gap-4">
                            <Link
                                href="#"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link
                                href="#"
                                className="text-muted-foreground transition-colors hover:text-foreground"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
                    <p className="text-sm text-muted-foreground">
                        {new Date().getFullYear()} TaskFlow. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Privacy
                        </Link>
                        <Link
                            href="#"
                            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
