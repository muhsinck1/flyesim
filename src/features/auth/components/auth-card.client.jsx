"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { routes } from "@/config/routes";

function GoogleLogo(props) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.78-2.4 3.63v3.02h3.88c2.27-2.09 3.57-5.17 3.57-8.84z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3.02c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.26v3.11C3.24 21.3 7.29 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.27a7.2 7.2 0 0 1-.38-2.27c0-.79.14-1.56.38-2.27V6.62H1.26A11.98 11.98 0 0 0 0 12c0 1.94.46 3.77 1.26 5.38l4.01-3.11z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.19 15.24 0 12 0 7.29 0 3.24 2.7 1.26 6.62l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77z"
      />
    </svg>
  );
}

/**
 * Sign-in / sign-up card. The backend owns auth (blueprint §23) — these forms are
 * DEMO stubs that show the interaction; wire them to the Next BFF → :8000 auth
 * routes in production. Google is a redirect to the backend OAuth flow.
 * @param {{ mode: "signin" | "signup" }} props
 */
export function AuthCard({ mode = "signin" }) {
  const isSignup = mode === "signup";
  const [showPw, setShowPw] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | success

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => setStatus("success"), 900);
  }

  return (
    <div className="w-full rounded-lg border border-border bg-card p-8 shadow-sm md:p-12">
      <h1 className="mb-2 font-display text-headline-md text-foreground">
        {isSignup ? "Create your account" : "Sign in"}
      </h1>
      <p className="mb-8 text-body-md text-muted-foreground">
        {isSignup
          ? "Join eSIMFlys to manage your plans and trips."
          : "Access your global data plans and trip history."}
      </p>

      <button
        type="button"
        className="mb-6 flex w-full items-center justify-center gap-3 rounded-md border border-border bg-card py-3 font-semibold text-foreground hover:bg-muted"
      >
        <GoogleLogo />
        Continue with Google
      </button>

      <div className="mb-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-border" />
        <span className="text-label-caps uppercase text-muted-foreground">or use email</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-label-bold text-foreground">Email address</span>
          <input
            required
            type="email"
            name="email"
            placeholder="name@company.com"
            className="w-full rounded-sm border border-border bg-muted px-4 py-3 text-body-md outline-none focus:border-primary"
          />
        </label>
        <label className="block">
          <span className="mb-1 flex items-center justify-between">
            <span className="text-label-bold text-foreground">Password</span>
            {!isSignup ? (
              <Link href={routes.forgotPassword()} className="text-label-bold text-primary hover:underline">
                Forgot password?
              </Link>
            ) : null}
          </span>
          <span className="relative block">
            <input
              required
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="••••••••"
              className="w-full rounded-sm border border-border bg-muted px-4 py-3 pr-11 text-body-md outline-none focus:border-primary"
            />
            <button
              type="button"
              aria-pressed={showPw}
              aria-label={showPw ? "Hide password" : "Show password"}
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            >
              {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </span>
        </label>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-sm bg-primary py-3.5 text-label-bold text-on-primary transition-all hover:bg-primary-container active:scale-[0.98] disabled:opacity-60"
        >
          {status === "loading" ? "…" : isSignup ? "Create account" : "Sign in"}
        </button>
      </form>

      {status === "success" ? (
        <p role="status" className="mt-4 rounded-sm bg-success-text/10 p-3 text-body-sm text-success-text">
          Demo — backend authentication is wired in production. You'd be signed in here.
        </p>
      ) : null}

      <p className="mt-6 text-body-sm text-muted-foreground">
        {isSignup ? (
          <>
            Already have an account?{" "}
            <Link href={routes.signin()} className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <Link href={routes.signup()} className="font-semibold text-primary hover:underline">
              Create one
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
