// Récupération de l'utilisateur en fonction de l'email

import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { email } = params;
  try {
    const characters = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    return NextResponse.json(characters, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération de l'utilisateur." },
      { status: 500 }
    );
  }
};
