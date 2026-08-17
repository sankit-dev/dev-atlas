import { useEffect, useRef, useState } from "react";
import { authClient } from "../lib/auth";

type SocialProvider = "github";

type AuthProvidersResponse = {
  providers?: Partial<Record<SocialProvider, boolean>>;
};

const apiOrigin = import.meta.env.VITE_API_ORIGIN ?? "http://localhost:4000";
const lastProviderStorageKey = "dev-atlas:last-auth-provider";
const providerLabels: Record<SocialProvider, string> = {
  github: "GitHub",
};

function getCallbackURL() {
  return `${window.location.origin}${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "U";
}

export function AuthControls() {
  const { data: session, isPending } = authClient.useSession();
  const [pendingProvider, setPendingProvider] = useState<SocialProvider | null>(
    null,
  );
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [enabledProviders, setEnabledProviders] = useState<SocialProvider[]>(
    [],
  );
  const [isProviderConfigPending, setIsProviderConfigPending] = useState(true);
  const [lastProvider, setLastProvider] = useState<SocialProvider | null>(null);
  const [authError, setAuthError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProviders() {
      try {
        const response = await fetch(`${apiOrigin}/api/auth/providers`);

        if (!response.ok) {
          throw new Error("Unable to load auth providers");
        }

        const data = (await response.json()) as AuthProvidersResponse;
        const providers: SocialProvider[] = [];

        if (data.providers?.github) {
          providers.push("github");
        }

        if (isMounted) {
          setEnabledProviders(providers);
        }
      } catch {
        if (isMounted) {
          setEnabledProviders([]);
        }
      } finally {
        if (isMounted) {
          setIsProviderConfigPending(false);
        }
      }
    }

    void loadProviders();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const storedProvider = window.localStorage.getItem(lastProviderStorageKey);

    if (storedProvider === "github") {
      setLastProvider(storedProvider);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!dropdownOpen) return;
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [dropdownOpen]);

  const signIn = async (provider: SocialProvider) => {
    setPendingProvider(provider);
    setAuthError("");
    setLastProvider(provider);
    window.localStorage.setItem(lastProviderStorageKey, provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: getCallbackURL(),
      });
    } catch {
      setAuthError(`Could not start ${providerLabels[provider]} login.`);
    } finally {
      setPendingProvider(null);
    }
  };

  const signOut = async () => {
    setIsSigningOut(true);
    setDropdownOpen(false);

    try {
      await authClient.signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isPending || isProviderConfigPending) {
    return <div aria-label='Checking session' className='auth-skeleton' />;
  }

  if (session?.user) {
    const { name, email, image } = session.user;
    const initials = getInitials(name, email);

    return (
      <div className="auth-avatar-wrap" ref={dropdownRef}>
        <button
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
          aria-label="Open account menu"
          className="auth-avatar-btn"
          onClick={() => setDropdownOpen((v) => !v)}
          type="button"
        >
          <span aria-hidden="true" className="auth-avatar-ring" />
          <span className="auth-avatar-inner">
            {image ? (
              <img
                alt={name ?? email ?? "User"}
                className="auth-avatar-img"
                src={image}
              />
            ) : (
              <span className="auth-avatar-initials">{initials}</span>
            )}
          </span>
        </button>

        {dropdownOpen && (
          <div className="auth-dropdown" role="menu">
            <div className="auth-dropdown__header">
              <div className="auth-dropdown__avatar-lg">
                {image ? (
                  <img alt={name ?? ""} src={image} />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div className="auth-dropdown__info">
                {name && <p className="auth-dropdown__name">{name}</p>}
                {email && <p className="auth-dropdown__email">{email}</p>}
              </div>
            </div>
            <div className="auth-dropdown__divider" />
            <button
              className="auth-dropdown__sign-out"
              disabled={isSigningOut}
              onClick={() => void signOut()}
              role="menuitem"
              type="button"
            >
              {isSigningOut ? "Signing out…" : "Sign out"}
            </button>
          </div>
        )}
      </div>
    );
  }

  const isGithubEnabled = enabledProviders.includes("github");

  return (
    <div className='auth-save-progress'>
      <span className='auth-save-progress__hint'>Login to save progress</span>
      <button
        className='auth-github-button'
        disabled={!isGithubEnabled || pendingProvider !== null}
        onClick={() => void signIn("github")}
        title={
          isGithubEnabled
            ? "Save notes and DSA progress with GitHub"
            : "GitHub login is not configured yet"
        }
        type='button'
      >
        <svg
          aria-hidden='true'
          className='auth-github-button__icon'
          viewBox='0 0 16 16'
        >
          <path
            d='M8 0C3.58 0 0 3.67 0 8.2c0 3.62 2.29 6.69 5.47 7.77.4.08.55-.18.55-.4v-1.53c-2.23.5-2.7-.98-2.7-.98-.36-.95-.89-1.2-.89-1.2-.73-.51.06-.5.06-.5.8.06 1.22.85 1.22.85.72 1.25 1.88.89 2.34.68.07-.53.28-.89.51-1.1-1.78-.21-3.64-.91-3.64-4.05 0-.9.31-1.63.82-2.2-.08-.21-.36-1.04.08-2.17 0 0 .67-.22 2.2.84A7.43 7.43 0 0 1 8 3.93c.68 0 1.36.09 2 .28 1.52-1.06 2.19-.84 2.19-.84.44 1.13.16 1.96.08 2.17.51.57.82 1.3.82 2.2 0 3.15-1.87 3.84-3.65 4.04.29.26.54.76.54 1.54v2.26c0 .22.14.48.55.4A8.1 8.1 0 0 0 16 8.2C16 3.67 12.42 0 8 0Z'
            fill='currentColor'
          />
        </svg>
        <span>
          {pendingProvider === "github"
            ? "Opening GitHub..."
            : lastProvider === "github"
              ? "Continue with GitHub"
              : "GitHub login"}
        </span>
      </button>
      {(authError || !isGithubEnabled) && (
        <p className='auth-save-progress__error'>
          {authError || "GitHub login setup needed"}
        </p>
      )}
    </div>
  );
}
