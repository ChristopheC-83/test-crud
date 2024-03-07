/* eslint-disable react/no-unescaped-entities */
"use client"


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Profil() {
  const { data: session } = useSession();
  const router = useRouter()


  if(!session){
    router.replace("/connection")
}
  return <div>Page de profil de l'utilisateur</div>;
}
