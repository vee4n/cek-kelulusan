// src/components/ResultCard.tsx
"use client";

interface StudentData {
  nama: string;
  ttl: string;
  nisn: string;
  statusKelulusan: "LULUS" | "TIDAK_LULUS" | "BELUM_DITENTUKAN";
}

interface ResultCardProps {
  data: StudentData;
  onReset: () => void;
}

const statusConfig = {
  LULUS: {
    label: "LULUS",
    icon: "✓",
    headline: "Selamat, Anda Dinyatakan",
    headlineAccent: "LULUS",
    description: "Anda telah berhasil menyelesaikan seluruh rangkaian ujian dan memenuhi syarat kelulusan. Semoga sukses di jenjang berikutnya.",
    bgGlow: "rgba(34,197,94,0.07)",
    borderColor: "rgba(34,197,94,0.25)",
    badgeBg: "rgba(34,197,94,0.1)",
    badgeBorder: "rgba(34,197,94,0.3)",
    badgeColor: "#16A34A",
    headlineColor: "#15803D",
    headlineGradient: "linear-gradient(135deg, #16A34A, #22C55E)",
  },
  TIDAK_LULUS: {
    label: "TIDAK LULUS",
    icon: "✕",
    headline: "Anda Dinyatakan",
    headlineAccent: "TIDAK LULUS",
    description: "Mohon tetap semangat. Silakan hubungi pihak sekolah untuk mengetahui langkah selanjutnya.",
    bgGlow: "rgba(239,68,68,0.07)",
    borderColor: "rgba(239,68,68,0.25)",
    badgeBg: "rgba(239,68,68,0.1)",
    badgeBorder: "rgba(239,68,68,0.3)",
    badgeColor: "#DC2626",
    headlineColor: "#B91C1C",
    headlineGradient: "linear-gradient(135deg, #DC2626, #EF4444)",
  },
  BELUM_DITENTUKAN: {
    label: "BELUM DITENTUKAN",
    icon: "⏳",
    headline: "Status Kelulusan",
    headlineAccent: "BELUM DITENTUKAN",
    description: "Hasil kelulusan Anda masih dalam proses verifikasi. Silakan cek kembali pada waktu pengumuman resmi.",
    bgGlow: "rgba(234,179,8,0.07)",
    borderColor: "rgba(234,179,8,0.25)",
    badgeBg: "rgba(234,179,8,0.1)",
    badgeBorder: "rgba(234,179,8,0.3)",
    badgeColor: "#B45309",
    headlineColor: "#92400E",
    headlineGradient: "linear-gradient(135deg, #D97706, #F59E0B)",
  },
};

export default function ResultCard({ data, onReset }: ResultCardProps) {
  const config = statusConfig[data.statusKelulusan];

  const dataRows = [
    { label: "Nama Lengkap", value: data.nama },
    { label: "Tempat, Tanggal Lahir", value: data.ttl },
    { label: "NISN", value: data.nisn },
  ];

  return (
    <div className="animate-scale-in">

      {/* Status Banner */}
      <div
        className="mb-6 rounded-xl p-6 text-center"
        style={{ background: config.bgGlow, border: `1px solid ${config.borderColor}` }}
      >
        <div
          className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase mb-3"
          style={{
            background: config.badgeBg,
            border: `1px solid ${config.badgeBorder}`,
            color: config.badgeColor,
          }}
        >
          <span>{config.icon}</span>
          <span>{config.label}</span>
        </div>

        <p className="font-serif text-lg font-medium leading-snug"
          style={{ color: "rgba(27,46,94,0.6)" }}>
          {config.headline}
        </p>
        <p
          className="font-serif text-2xl font-bold mt-1"
          style={{
            background: config.headlineGradient,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {config.headlineAccent}
        </p>
        <p className="text-sm mt-3 max-w-sm mx-auto leading-relaxed"
          style={{ color: "rgba(27,46,94,0.5)" }}>
          {config.description}
        </p>
      </div>

      {/* Student Data */}
      <div
        className="rounded-xl p-5 mb-5 space-y-4"
        style={{
          background: "rgba(27,46,94,0.03)",
          border: "1px solid rgba(27,46,94,0.1)",
        }}
      >
        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase"
          style={{ color: "rgba(232,160,32,0.8)" }}>
          Data Peserta Didik
        </h3>
        {dataRows.map((row, index) => (
          <div key={index} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium" style={{ color: "rgba(27,46,94,0.45)" }}>
              {row.label}
            </span>
            <span className="text-sm font-medium font-sans" style={{ color: "#1B2E5E" }}>
              {row.value}
            </span>
            {index < dataRows.length - 1 && (
              <div className="mt-3" style={{ height: "1px", background: "rgba(27,46,94,0.08)" }} />
            )}
          </div>
        ))}
      </div>

      {/* Official Note */}
      <div
        className="rounded-lg px-4 py-3 mb-5 text-xs leading-relaxed text-center"
        style={{
          background: "rgba(232,160,32,0.05)",
          border: "1px solid rgba(232,160,32,0.2)",
          color: "rgba(27,46,94,0.45)",
        }}
      >
        Hasil ini bersifat resmi dan dapat dijadikan acuan awal. Sertifikat kelulusan resmi dapat diambil di sekolah sesuai jadwal yang telah ditetapkan.
      </div>

      {/* Back Button */}
      <button
        onClick={onReset}
        className="w-full rounded-lg py-3 text-sm font-medium tracking-wider transition-all duration-200 hover:opacity-75 active:scale-95"
        style={{
          background: "rgba(27,46,94,0.05)",
          border: "1px solid rgba(27,46,94,0.15)",
          color: "rgba(27,46,94,0.6)",
        }}
      >
        ← Kembali ke Halaman Login
      </button>
    </div>
  );
}
