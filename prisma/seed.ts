// prisma/seed.ts
import { PrismaClient, StatusKelulusan } from "@prisma/client";

const prisma = new PrismaClient();

const siswaSeed = [
  {
    nama: "AZZALEA YUMI SOERJA",
    ttl: "Jakarta, 27 Desember 2010",
    nisn: "0109658825",
    nomorInduk: "3175",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "CALLISTA NATALI TANTO",
    ttl: "Jakarta, 22 Desember 2010",
    nisn: "0103279864",
    nomorInduk: "3152",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "CARISSA LILIAN FA",
    ttl: "Jakarta, 7 November 2010",
    nisn: "0102026440",
    nomorInduk: "3154",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "CEDRIC FRANCISCO MIHARJA",
    ttl: "Jakarta, 2 Desember 2011",
    nisn: "0116659899",
    nomorInduk: "3155",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "CHANTAL JOSEPHINE",
    ttl: "Jakarta, 5 April 2010",
    nisn: "0104582895",
    nomorInduk: "3156",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "CHERISH HUANG",
    ttl: "Jakarta, 14 September 2011",
    nisn: "0112136867",
    nomorInduk: "3176",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "DERRICK ALVARO CHANDRA",
    ttl: "Jakarta, 2 Maret 2011",
    nisn: "0118495492",
    nomorInduk: "3157",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "GRACIA EVALINA SELO PALANTIK",
    ttl: "Jakarta, 22 Desember 2010",
    nisn: "0101634573",
    nomorInduk: "3158",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "JENNIFER ANGELIN",
    ttl: "Jakarta, 29 Januari 2011",
    nisn: "0114129607",
    nomorInduk: "3159",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "JEVELIN ARTANTI SENTOSA",
    ttl: "Jakarta, 26 Maret 2011",
    nisn: "0113429679",
    nomorInduk: "3160",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "JONAS CRISTIAN FLAVIUS",
    ttl: "Jakarta, 16 Mei 2011",
    nisn: "0112898475",
    nomorInduk: "3161",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "JUSTIN EVANGELIA SUNG",
    ttl: "Semitau, 22 Mei 2011",
    nisn: "0114299579",
    nomorInduk: "3162",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "JUSTIN REINHART TAN",
    ttl: "Jakarta, 12 Oktober 2011",
    nisn: "0118662674",
    nomorInduk: "3163",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "KEVIN IMANUEL",
    ttl: "Jakarta, 16 Juli 2011",
    nisn: "0118773658",
    nomorInduk: "3164",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "KEVIN OCTOVIANO IVANDER",
    ttl: "Jakarta, 28 Oktober 2011",
    nisn: "0113827909",
    nomorInduk: "3165",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "LIVEECA CHERYL MANUELA",
    ttl: "Jakarta, 6 Agustus 2011",
    nisn: "0116927366",
    nomorInduk: "3166",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "MATTHEW LEONARD SEANAY",
    ttl: "Jakarta, 21 September 2011",
    nisn: "0113780382",
    nomorInduk: "3167",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "MIKHAEL ANGELO ZHANG",
    ttl: "Jakarta, 12 Mei 2010",
    nisn: "0108507285",
    nomorInduk: "3168",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "MOSES MONDRIAN",
    ttl: "Jakarta, 25 Januari 2011",
    nisn: "0114823642",
    nomorInduk: "3169",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "NINA KLARISSA DEWI",
    ttl: "Jakarta, 14 April 2011",
    nisn: "0111501233",
    nomorInduk: "3170",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "RAYNER NATHANAEL PHANG",
    ttl: "Jakarta, 7 November 2011",
    nisn: "0114456958",
    nomorInduk: "3171",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "SHALOM MICHELLE REINARTA INTAN HUTABARAT",
    ttl: "Jakarta, 16 Juli 2011",
    nisn: "0119594776",
    nomorInduk: "3172",
    statusKelulusan: StatusKelulusan.LULUS,
  },
  {
    nama: "WILLIAM ANYURI",
    ttl: "Jakarta, 20 Februari 2011",
    nisn: "0155329091",
    nomorInduk: "3173",
    statusKelulusan: StatusKelulusan.LULUS,
  },
];

async function main() {
  console.log("🌱 Memulai proses seeding database...");
  await prisma.siswa.deleteMany();
  console.log("🗑️  Data lama telah dihapus.");

  for (const siswa of siswaSeed) {
    await prisma.siswa.create({ data: siswa });
    console.log(`✅ ${siswa.nama} (${siswa.nomorInduk})`);
  }

  console.log(`\n🎉 Seeding selesai! ${siswaSeed.length} data siswa berhasil ditambahkan.`);
}

main()
  .catch((e) => {
    console.error("❌ Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
