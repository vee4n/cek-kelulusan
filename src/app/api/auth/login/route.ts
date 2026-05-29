// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Basic input validation
    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Nama dan nomor induk wajib diisi." },
        { status: 400 }
      );
    }

    const trimmedUsername = String(username).trim();
    const trimmedPassword = String(password).trim();

    if (trimmedUsername.length < 2 || trimmedPassword.length < 3) {
      return NextResponse.json(
        { success: false, message: "Data yang dimasukkan tidak valid." },
        { status: 400 }
      );
    }

    // Find student by name (case-insensitive) AND nomorInduk as password
    const siswa = await prisma.siswa.findFirst({
      where: {
        nama: {
          equals: trimmedUsername,
          mode: "insensitive",
        },
        nomorInduk: trimmedPassword,
      },
      select: {
        id: true,
        nama: true,
        ttl: true,
        nisn: true,
        statusKelulusan: true,
        // Deliberately exclude nomorInduk from response
      },
    });

    if (!siswa) {
      // Generic message — do not reveal whether username or password is wrong
      return NextResponse.json(
        {
          success: false,
          message:
            "Data tidak ditemukan. Pastikan nama dan nomor induk siswa sudah benar.",
        },
        { status: 401 }
      );
    }

    // Return only what the student should see
    return NextResponse.json({
      success: true,
      data: {
        nama: siswa.nama,
        ttl: siswa.ttl,
        nisn: siswa.nisn,
        statusKelulusan: siswa.statusKelulusan,
      },
    });
  } catch (error) {
    console.error("[LOGIN_ERROR]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Terjadi kesalahan pada server. Silakan coba lagi nanti.",
      },
      { status: 500 }
    );
  }
}
