// MAJ biographie d'un personnage

import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  const { id } = params;
  // console.log("id====>", id)
  const body = await req.json();
  const { bio } = body;
  // console.log("bio====>", bio)
  try {
    const newBio = await prisma.characters.update({
      where: { id: parseInt(id) },
      data: { bio: bio },
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
