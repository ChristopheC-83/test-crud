import prisma from "@/lib/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  try {
    const { name, email, password } = await req.json();

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer le nouvel utilisateur avec le mot de passe hashé
    const newUser = await prisma.users.create({
      data: {
        name : name,
        email : email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(newUser, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de la création du personnage :", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du personnage." },
      { status: 500 }
    );
  }
}
