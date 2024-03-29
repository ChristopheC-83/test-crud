import prisma from "@/lib/connect";
import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { getAuthSession } from "../../auth/[...nextauth]/route";

// get, post, put, patch, delete, head, options

// Cet endpoint renvoie un personnage en fonction de son id
//  qd il est appelé en GET

export const GET = async (req, { params }) => {
  // accessible seulement si user connecté
  // ça doit venit en renfort de la protection côté client
  // et permet de bloquer l'accès à l'endpoint de l'extérieur de l'application

  // const session = await getAuthSession();
  // if (!session || !session.user) {
  //   return NextResponse.json(
  //     { message: "Vous devez être connecté pour accéder à cette ressource" },
  //     { status: 403 }
  //   );
  // }

  const { id } = params;
  try {
    //  dans une constante
    // on find unique, on cherche un element
    // dans la collection characters
    //  avec prisma
    // dont l'id est égal à l'id passé en paramètre
    // findUnique peut être remplacé par findMany, update, create(Many), delete(Many)...
    const character = await prisma.characters.findUnique({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(character, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération du personnage." },
      { status: 500 }
    );
  }
};


// MAJ dynamique des caractéristiques
export const PATCH = async (req, { params }) => {
  const { id } = params;
  const body = await req.json();
  const { characteristic, newValue } = body;

  try {

    const updateData = {};
    updateData[characteristic] = parseInt(newValue) ;

    const updatedCharacter = await prisma.characters.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(updatedCharacter, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour du personnage." },
      { status: 500 }
    );
  }
};

export const DELETE = async (req, { params }) => {
  let { id } = params;
  id = parseInt(id);
  try {
    const deletedCharacter = await prisma.characters.delete({
      where: { id },
    });
    return NextResponse.json(deletedCharacter, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la suppression du personnage !" },
      { status: 500 }
    );
  }
};

export const POST = async (req, res) => {
  try {
    const newCharacter = await prisma.characters.create({
      data: {
        name: "kiki",
        avatar:
          "https://mycloud.barpat.fun/public/assets/Images/Bibliotheque/perso_rpg/elfe.jpg",
        type: "chevalier",
      },
    });
    return NextResponse.json(newCharacter, { status: 200 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Erreur lors de la création du personnage." },
      { status: 500 }
    );
  }
};
