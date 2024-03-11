// MAJ biographie d'un personnage

import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  let { id } = params;
  id = parseInt(id);


  const body = await req.json();
  const { bio } = body;

  try {
  const newBio = await prisma.characters.update({
    where: { id: parseInt(id) },
    data: {bio : bio},
  });

  
    return NextResponse.json(newBio, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Erreur lors de la MAJ de la Biographie." },
      { status: 500 }
    );
  }
};
