
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
