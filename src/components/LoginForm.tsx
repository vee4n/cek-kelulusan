// src/components/LoginForm.tsx
"use client";

import { useState } from "react";

interface StudentData {
  nama: string;
  ttl: string;
  nisn: string;
  statusKelulusan: "LULUS" | "TIDAK_LULUS" | "BELUM_DITENTUKAN";
}

interface LoginFormProps {
  onSuccess: (data: StudentData) => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Mohon isi nama dan nomor induk siswa.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        onSuccess(result.data);
      } else {
        setError(result.message || "Login gagal. Silakan coba lagi.");
      }
    } catch {
      setError("Gagal terhubung ke server. Periksa koneksi internet Anda.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>

      {/* Username */}
      <div className="space-y-2">
        <label htmlFor="username" className="block text-sm font-medium tracking-wide"
          style={{ color: "rgba(27,46,94,0.75)" }}>
          Nama Siswa
        </label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Masukkan nama lengkap Anda"
          autoComplete="off"
          disabled={isLoading}
          className="w-full rounded-lg px-4 py-3 text-sm font-sans disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: "#F5F7FA",
            border: "1px solid rgba(27,46,94,0.2)",
            color: "#1B2E5E",
            outline: "none",
          }}
          onFocus={e => {
            e.target.style.borderColor = "rgba(232,160,32,0.7)";
            e.target.style.boxShadow = "0 0 0 3px rgba(232,160,32,0.1)";
          }}
          onBlur={e => {
            e.target.style.borderColor = "rgba(27,46,94,0.2)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium tracking-wide"
          style={{ color: "rgba(27,46,94,0.75)" }}>
          Nomor Induk Siswa (NIS)
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan nomor induk Anda"
          autoComplete="current-password"
          disabled={isLoading}
          className="w-full rounded-lg px-4 py-3 text-sm font-sans disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          style={{
            background: "#F5F7FA",
            border: "1px solid rgba(27,46,94,0.2)",
            color: "#1B2E5E",
            outline: "none",
          }}
          onFocus={e => {
            e.target.style.borderColor = "rgba(232,160,32,0.7)";
            e.target.style.boxShadow = "0 0 0 3px rgba(232,160,32,0.1)";
          }}
          onBlur={e => {
            e.target.style.borderColor = "rgba(27,46,94,0.2)";
            e.target.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <div
          className="rounded-lg px-4 py-3 text-sm animate-fade-in"
          style={{
            background: "rgba(239,68,68,0.06)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#DC2626",
          }}
        >
          <div className="flex items-start gap-2">
            <span className="text-base leading-tight">⚠</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="relative w-full rounded-lg py-3.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden group"
        style={{
          background: "linear-gradient(135deg, #E8A020 0%, #F0B030 50%, #E8A020 100%)",
          backgroundSize: "200% auto",
          color: "#FFFFFF",
          fontFamily: "'DM Sans', sans-serif",
          boxShadow: "0 4px 15px rgba(232,160,32,0.3)",
        }}
      >
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: "linear-gradient(135deg, #F0B030 0%, #F5C040 50%, #F0B030 100%)" }}
        />
        <span className="relative flex items-center justify-center gap-2">
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Memeriksa Data...
            </>
          ) : (
            "Cek Kelulusan"
          )}
        </span>
      </button>

      {/* Privacy note */}
      <p className="text-center text-xs leading-relaxed" style={{ color: "rgba(27,46,94,0.35)" }}>
        Data bersifat rahasia dan hanya dapat diakses oleh siswa yang bersangkutan.
      </p>
    </form>
  );
}
