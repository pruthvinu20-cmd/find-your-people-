import { useState } from "react";
import App from "./App";

const ACCOUNTS_KEY = "peopleconnect_demo_accounts";
const SESSION_KEY = "peopleconnect_demo_session";

function readAccounts() {
try {
const accounts = JSON.parse(
localStorage.getItem(ACCOUNTS_KEY) || "[]"
);
return Array.isArray(accounts) ? accounts : [];
} catch {
return [];
}
}

export default function AuthGate() {
const [session, setSession] = useState(() => {
try {
return JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
} catch {
return null;
}
});

const [isSignup, setIsSignup] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const [submitting, setSubmitting] = useState(false);

function handleSubmit(event) {
event.preventDefault();
setError("");
setMessage("");
setSubmitting(true);

try {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    throw new Error("Please enter your email and password.");
  }

  if (password.length < 6) {
    throw new Error("Password must contain at least 6 characters.");
  }

  const accounts = readAccounts();

  if (isSignup) {
    const cleanName = name.trim();

    if (!cleanName) {
      throw new Error("Please enter your full name.");
    }

    const alreadyExists = accounts.some(
      (account) => account.email === cleanEmail
    );

    if (alreadyExists) {
      throw new Error(
        "An account with this email already exists. Please log in."
      );
    }

    const newAccount = {
      name: cleanName,
      email: cleanEmail,
      password,
    };

    accounts.push(newAccount);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    setMessage("Account created! You can now log in.");
    setIsSignup(false);
    setPassword("");
  } else {
    const account = accounts.find(
      (item) =>
        item.email === cleanEmail &&
        item.password === password
    );

    if (!account) {
      throw new Error(
        "Account not found or password is incorrect. Please sign up first."
      );
    }

    const currentSession = {
      name: account.name,
      email: account.email,
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(currentSession)
    );

    setSession(currentSession);
  }
} catch (err) {
  setError(err.message || "Something went wrong.");
} finally {
  setSubmitting(false);
}

}

function handleLogout() {
localStorage.removeItem(SESSION_KEY);
setSession(null);
setPassword("");
setMessage("You have logged out successfully.");
setError("");
}

if (session) {
return (
<>
<div className="auth-user-bar">
<span>
Welcome, <strong>{session.name}</strong>
</span>

      <button
        type="button"
        onClick={handleLogout}
        className="auth-logout"
      >
        Logout
      </button>
    </div>

    <App />
  </>
);

}

return (
<main className="auth-page">
<section className="auth-card">
<div className="auth-logo">✳</div>

    <p className="auth-eyebrow">CONNECTIONS THAT MATTER</p>

    <h1>PeopleConnect AI</h1>

    <p className="auth-description">
      Discover people who share your interests, understand your
      goals, and inspire you to grow.
    </p>

    <div className="auth-tabs">
      <button
        type="button"
        className={!isSignup ? "auth-tab active" : "auth-tab"}
        onClick={() => {
          setIsSignup(false);
          setError("");
          setMessage("");
        }}
      >
        Login
      </button>

      <button
        type="button"
        className={isSignup ? "auth-tab active" : "auth-tab"}
        onClick={() => {
          setIsSignup(true);
          setError("");
          setMessage("");
        }}
      >
        Create account
      </button>
    </div>

    <form onSubmit={handleSubmit}>
      {isSignup && (
        <>
          <label htmlFor="auth-name">Full name</label>
          <input
            id="auth-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />
        </>
      )}

      <label htmlFor="auth-email">Email address</label>
      <input
        id="auth-email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="you@example.com"
        autoComplete="email"
        required
      />

      <label htmlFor="auth-password">Password</label>
      <input
        id="auth-password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="At least 6 characters"
        autoComplete={isSignup ? "new-password" : "current-password"}
        minLength={6}
        required
      />

      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}

      {message && (
        <div className="auth-message" role="status">
          {message}
        </div>
      )}

      <button
        className="auth-submit"
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? "Please wait..."
          : isSignup
          ? "Create account →"
          : "Login →"}
      </button>
    </form>

    <p className="auth-switch">
      {isSignup
        ? "Already have an account?"
        : "New to PeopleConnect AI?"}{" "}
      <button
        type="button"
        onClick={() => {
          setIsSignup(!isSignup);
          setError("");
          setMessage("");
        }}
      >
        {isSignup ? "Login" : "Sign up"}
      </button>
    </p>

    <p className="auth-demo-note">
      College demonstration mode · No email verification required
    </p>
  </section>

  <style>{`
    * {
      box-sizing: border-box;
    }

    .auth-page {
      min-height: 100vh;
      display: grid;
      place-items: center;
      padding: 24px;
      background: #f8f8f3;
      font-family: 'DM Sans', Arial, sans-serif;
      color: #23352c;
    }

    .auth-card {
      width: 100%;
      max-width: 440px;
      padding: 34px;
      background: white;
      border: 1px solid #e8e9e1;
      border-radius: 24px;
      box-shadow: 0 15px 50px #263b3010;
    }

    .auth-logo {
      width: 48px;
      height: 48px;
      display: grid;
      place-items: center;
      background: #344e41;
      color: white;
      border-radius: 15px;
      font-size: 28px;
      margin-bottom: 22px;
    }

    .auth-eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #718575;
    }

    .auth-card h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 34px;
      margin: 10px 0;
    }

    .auth-description {
      font-size: 14px;
      line-height: 1.7;
      color: #718075;
      margin-bottom: 25px;
    }

    .auth-tabs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      padding: 5px;
      background: #f4f5ef;
      border-radius: 14px;
      margin-bottom: 24px;
    }

    .auth-tab {
      border: none;
      border-radius: 10px;
      padding: 12px 8px;
      background: transparent;
      color: #637365;
      font-weight: 600;
      cursor: pointer;
    }

    .auth-tab.active {
      background: white;
      color: #344e41;
      box-shadow: 0 2px 8px #263b3010;
    }

    .auth-card label {
      display: block;
      font-size: 13px;
      font-weight: 700;
      margin: 16px 0 8px;
    }

    .auth-card input {
      width: 100%;
      padding: 13px 14px;
      border: 1px solid #e0e4dc;
      border-radius: 12px;
      font: inherit;
      outline: none;
      background: white;
    }

    .auth-card input:focus {
      border-color: #708b78;
      box-shadow: 0 0 0 3px #708b781a;
    }

    .auth-submit {
      width: 100%;
      margin-top: 22px;
      padding: 14px;
      border: none;
      border-radius: 24px;
      background: #344e41;
      color: white;
      font-weight: 700;
      cursor: pointer;
    }

    .auth-submit:disabled {
      opacity: 0.65;
      cursor: wait;
    }

    .auth-error,
    .auth-message {
      margin-top: 16px;
      padding: 12px;
      border-radius: 10px;
      font-size: 13px;
      line-height: 1.5;
      overflow-wrap: anywhere;
    }

    .auth-error {
      background: #fff0ee;
      color: #a13225;
    }

    .auth-message {
      background: #eef5e9;
      color: #355d3c;
    }

    .auth-switch {
      margin: 22px 0 0;
      text-align: center;
      font-size: 13px;
      color: #718075;
    }

    .auth-switch button {
      border: none;
      background: none;
      color: #344e41;
      font-weight: 700;
      cursor: pointer;
    }

    .auth-demo-note {
      margin: 18px 0 0;
      text-align: center;
      font-size: 11px;
      line-height: 1.5;
      color: #849085;
    }

    .auth-user-bar {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-wrap: wrap;
      gap: 14px;
      padding: 12px 6%;
      background: #eef1e9;
      color: #344e41;
      font: 13px Arial, sans-serif;
    }

    .auth-logout {
      border: 1px solid #cbd5c8;
      border-radius: 20px;
      background: white;
      color: #344e41;
      padding: 8px 14px;
      cursor: pointer;
      font-weight: 700;
    }

    @media (max-width: 480px) {
      .auth-card {
        padding: 24px;
      }

      .auth-card h1 {
        font-size: 29px;
      }
    }
  `}</style>
</main>

);
}