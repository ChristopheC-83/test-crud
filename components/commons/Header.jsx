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
    signOut(); //fonction de nextauth
  }
  if (!session) {
    return (
      <Container>
        <div className="flex items-center justify-between w-full text-2xl ">
          <div>
            <Link href="/">Accueil</Link>
          </div>
          <div>
            <Button>
              <Link href="/connection">
                <h4>Connexion</h4>
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  if (session) {
    return (
      <Container>
        <div className="flex items-center justify-between w-full text-2xl ">
          <div>
            <Link href="/">Accueil</Link>
          </div>
          <div className="flex gap-6">
            <Link href="/create">Ajouter</Link>
            <Link href="/profile">Profil</Link>
          </div>
          <div>
            <Button onClick={logOut}>
              <h4>Deconnexion</h4>
            </Button>
          </div>
        </div>
      </Container>
    );
  }
}
