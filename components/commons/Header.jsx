"use client";

import Link from "next/link";
import Container from "./Container";
import Button from "../utilities/Button";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    console.log(session.user.name);
  }

  function logOut() {
    signOut();  //fonction de nextauth
  }

  return (
    <Container>
      <div className="flex items-center justify-between w-full text-2xl ">
        <div>
          <Link href="/">Accueil</Link>
        </div>
        <div>
          <Link href="/">Ajouter</Link>
        </div>
        <div className="gap-3 flexMid">
          {session?.user?.email ? (
            <Button onClick={() => logOut()}>
              <h4>Déconnexion</h4>
            </Button>
          ) : (
            <Button>
              <Link href="/connection">
                <h4>Connexion</h4>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
