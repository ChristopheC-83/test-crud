import prisma from "@/lib/connect";
import { NextResponse } from "next/server";




// Cet endpoint renvoie un personnage en fonction de son id
//  qd il est appelé en GET

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    //  dans une constante
    // on find unique, on cherche un element
    // dans la collection characters
    //  avec prisma
    // dont l'id est égal à l'id passé en paramètre
    // findUnique peut être remplacé par findMany, update, create(Many), delete(Many)...
    const character = await prisma.characters.findUnique({
      where: { id : parseInt(id)},
    });

    return NextResponse.json(character, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération du personnage." },
      { status: 500 }
    );
  }
};
