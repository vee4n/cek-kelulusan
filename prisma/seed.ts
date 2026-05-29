// prisma/seed.ts
import { PrismaClient, StatusKelulusan } from "@prisma/client";

const prisma = new PrismaClient();

const siswaSeed = [
  {
    nama: "Ahmad Fauzi",
    ttl: "Jakarta, 12 Mei 2006",
    nisn: "0061234567",
    nomorInduk: "2024001",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Siti Nurhaliza",
    ttl: "Bandung, 03 Agustus 2006",
    nisn: "0062345678",
    nomorInduk: "2024002",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Budi Santoso",
    ttl: "Surabaya, 22 Januari 2006",
    nisn: "0063456789",
    nomorInduk: "2024003",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Dewi Rahayu",
    ttl: "Yogyakarta, 17 November 2005",
    nisn: "0054567890",
    nomorInduk: "2024004",
    statusKelulusan: StatusKelulusan.TIDAK_LULUS,
  },
  {
    nama: "Muhammad Rizky",
    ttl: "Medan, 08 Maret 2006",
    nisn: "0065678901",
    nomorInduk: "2024005",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Putri Anjali",
    ttl: "Semarang, 29 Juli 2006",
    nisn: "0066789012",
    nomorInduk: "2024006",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Eko Prasetyo",
    ttl: "Malang, 14 Oktober 2005",
    nisn: "0057890123",
    nomorInduk: "2024007",
    statusKelulusan: StatusKelulusan.BELUM_DITENTUKAN,
  },
  {
    nama: "Nurul Hidayah",
    ttl: "Makassar, 05 Februari 2006",
    nisn: "0068901234",
    nomorInduk: "2024008",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "Azzalea Yumi Soerja",
    ttl: "Jakarta, 27 Desember 2010",
    nisn: "0109658825",
    nomorInduk: "3175",          // this is the password to login
    statusKelulusan: StatusKelulusan.LULUS,   // or TIDAK_LULUS / BELUM_DITENTUKAN
  },
];

async function main() {
  console.log("🌱 Memulai proses seeding database...");

  // Hapus data lama
  await prisma.siswa.deleteMany();
  console.log("🗑️  Data lama telah dihapus.");

  // Masukkan data baru
  for (const siswa of siswaSeed) {
    await prisma.siswa.create({ data: siswa });
    console.log(`✅ Berhasil menambahkan: ${siswa.nama} (${siswa.nomorInduk})`);
  }

  console.log(`\n🎉 Seeding selesai! ${siswaSeed.length} data siswa berhasil ditambahkan.`);
  console.log("\n📋 Contoh login:");
  console.log("   Username: Ahmad Fauzi  | Password: 2024001");
  console.log("   Username: Siti Nurhaliza | Password: 2024002");
  console.log("   Username: Budi Santoso  | Password: 2024003");
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
