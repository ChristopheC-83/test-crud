
import prisma from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const types = await prisma.type.findMany();
    return NextResponse.json(types, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Pb de récupération des types." },
      { status: 500 }
    );
  }
};
