/* eslint-disable react/no-unescaped-entities */
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profil() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return <div>Chargement en cours...</div>;
  }

  return <div>Page de profil de {session?.user?.name}</div>;
}
