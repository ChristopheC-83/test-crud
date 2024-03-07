/* eslint-disable react/no-unescaped-entities */
"use client"


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


 export default function CreateCharacter() {
  const { data: session } = useSession();
  const router = useRouter()

  if(!session){
    router.replace("/connection")
}
return (
    <div>

page création personnage

    </div>

  );

}