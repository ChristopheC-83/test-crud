// Récupération de tous les personnages

import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const characters = await prisma.characters.findMany();

    return NextResponse.json(characters, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération des personnages." },
      { status: 500 }
    );
  }
};
