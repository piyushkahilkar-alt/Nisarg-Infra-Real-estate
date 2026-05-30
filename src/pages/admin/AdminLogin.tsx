import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../lib/firebase";
import toast from "react-hot-toast";
import { ShieldAlert, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
        if (!(import.meta as any).env.VITE_FIREBASE_API_KEY || (import.meta as any).env.VITE_FIREBASE_API_KEY.includes("Dummy")) {
          toast.error("Firebase API Key is missing. Check your Vercel Environment Variables. They MUST start with VITE_ and you MUST trigger a Re-build.");
          setLoading(false);
          return;
        }
        const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Check if user is in admins collection
      const docRef = doc(db, "admins", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        toast.success("Welcome back Admin");
        navigate("/admin");
      } else {
        // For development/demo: if they created an account and can login, allow first bootstrap
        // Let's create the admin record if this is the very first login (bootstrap logic)
        // In real prod, this should be removed and seeded manually.
        try {
          await setDoc(docRef, {
            email: user.email,
            createdAt: new Date().toISOString(),
          });
          toast.success("Admin access granted (Bootstrap mode)");
          navigate("/admin");
        } catch (err) {
          toast.error("Unauthorized access.");
          auth.signOut();
        }
      }
    } catch (error: any) {
      console.error("Firebase Login Error:", error);
      if (error.code === "auth/invalid-api-key") {
        toast.error("Invalid Firebase API Key. If you just added it to Vercel, youMUST REDEPLOY your project for changes to take effect.");
      } else if (error.code === "auth/operation-not-allowed") {
        toast.error("Email/Password authentication is disabled in Firebase Console. Please enable it for your current Firebase project.");
      } else {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          <ShieldAlert className="mx-auto h-12 w-12 text-[#137A35]" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in with your administrator credentials
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="sr-only">Email address</label>
              <input
                type="email"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#137A35] focus:border-[#137A35] focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="sr-only">Password</label>
              <input
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-[#137A35] focus:border-[#137A35] focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#137A35] hover:bg-[#29A53A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#137A35] disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
