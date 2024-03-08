/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useCharacter } from "@/hooks/useCharacter";
import { useTypes } from "@/hooks/useTypes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Character({ params }) {
  const { id } = params;

  const { data: session } = useSession();
  console.log(session);
  // on renomme les données data en "character"

  const { data: character, isFetching, error } = useCharacter(id);
  const { data: types, isFetching: fetchingTypes } = useTypes();

  function handle() {
    console.log("click");
  }

  if (isFetching) {
    return <div>Chargement en cours...</div>;
  }
  if (fetchingTypes) {
    return <div>Chargement en cours...</div>;
  }
  if (error) {
    return <div>Erreur : {error.message}</div>;
  }
  if (!character) {
    return <div>Aucun personnage trouvé avec cet ID.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">{character.name} en détails !</h3>
      <ButtonsTypes types={types} />
      <div className="flex flex-col gap-6 sm:flex-row">
        <Image
          src={character.avatar}
          alt={character.name}
          width={400}
          height={400}
          className="mx-auto : sm:mx-0"
          loading="lazy"
        />
        <div className="w-full">
          <h3 className="text-center">{character.name}</h3>

          <Button onClick={handle}>
            <Link
              className="text-sm"
              href={`/characters/${character.typeSlug}`}
            >
              {character.typeSlug}
            </Link>
          </Button>
          <div className="mx-auto w-fit sm:mx-0">
            <div className="flex justify-between">
              <p>Points de Vie :</p> <p>{character.pv}</p>
            </div>
            <div className="flex justify-between">
              <p>Points de Magie :</p> <p>{character.pm}</p>
            </div>
            <div className="flex justify-between">
              <p>Constitution :</p> <p>{character.constit}</p>
            </div>
            <div className="flex justify-between">
              <p>Dexterité :</p> <p>{character.dex}</p>
            </div>
            <p className="my-2">Biographie : {character.bio}</p>
            {session && session.user && (
              <div className="flex justify-between w-[200px] mt-4">
                <Link href="/">
                  <Button onClick={handle}>
                    <p className="text-sm">Modifier</p>
                  </Button>
                </Link>
                <Link href="/">
                  <Button onClick={handle}>
                    <p className="text-sm">Supprimer</p>
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
