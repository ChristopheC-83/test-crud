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

export const POST = async (req, res) => {
  const body = await req.json();
  let { name, avatar, typeSlug, pv, pm, constit, dex } = body;
  // on met les données numéraires en Int sur une base décimale
  pv = parseInt(pv, 10);
  pm = parseInt(pm, 10);
  constit = parseInt(constit, 10);
  dex = parseInt(dex, 10);
  try {
    const newCharacter = await prisma.characters.create({
      data: {
        name,
        avatar,
        typeSlug,
        pv,
        pm,
        constit,
        dex,
      },
    });
    return NextResponse.json(newCharacter, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création du personnage." },
      { status: 500 }
    );
  }
};

