// Récupération de tous les personnages en fonction du type

import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { type } = params;
  try {
    const characters = await prisma.characters.findMany({
      where: {
        typeSlug:  type,
      },
    });
    return NextResponse.json(characters, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération des personnages." },
      { status: 500 }
    );
  }
};
