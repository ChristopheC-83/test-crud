import prisma from "@/lib/connect";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";




export async function POST(req, res) {
  try {
    const { name, email, password } = await req.json();

    // nom déjà utilisé
    const isNameUsed = await prisma.users.findUnique({
      where: {
        name: name,
      },
    });

    if (isNameUsed) {
      return NextResponse.json(
        { error: "Ce nom est déjà utilisé." },
        { status: 400 }
      );
    }

    // mail déjà utilisé
    const isEmailUsed = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    if(isEmailUsed){
      
      return NextResponse.json(
        { error: "Cet email est déjà utilisé." },
        { status: 400 }
      );
    }

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
