import { TYPES } from "@/utils/types"
import { NextResponse } from "next/server"


export const GET = async () =>{
    return NextResponse.json(TYPES, {STATUE:200})


}