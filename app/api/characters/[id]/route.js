import { NextResponse } from "next/server"


let truc = "coucou"
//  recup 1 perso
export const GET = async (req, {params}) =>{

    const {id} = params
    return NextResponse.json(id, {status:200})
}