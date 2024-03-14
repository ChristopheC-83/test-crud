/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useCharacter } from "@/hooks/useCharacter";
import { useDeleteCharacterById } from "@/hooks/useDeleteCharacterById";
import { useTypes } from "@/hooks/useTypes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Character({ params }) {
  const { id } = params;
  const { data: session } = useSession();

  // on renomme les données data en "character"
  const { data: character, isFetching, error } = useCharacter(id);
  const { data: types, isFetching: fetchingTypes } = useTypes();
  const deleteCharacter = useDeleteCharacterById();

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
      <div className="flex flex-col gap-6 mx-auto sm:flex-row w-fit">
        <div className="min-h-[300px] min-w-[300px] max-h-[400px] max-w-[400px] aspect-square mx-auto">
        <Image
          src={character.avatar}
          alt={character.name}
          width={400}
          height={400}
          className="mx-auto sm:mx-0"
          loading="lazy"
        />
        </div>
        <div className="w-full">
          <h3 className="text-center">{character.name}</h3>

          <Button>
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
            <p className="my-2">Biographie : </p>
            {/* pour décoder les caractères html */}
            <div dangerouslySetInnerHTML={{ __html: character.bio }} />

            {session && (
              <div className="flex justify-between w-[200px] mt-4">
                <Link href={`/updateCharacter/${character.id}`}>
                  <Button>
                    <p className="text-sm">Modifier</p>
                  </Button>
                </Link>
                {session?.user?.role === "ADMIN" && (
                  <Link href="/">
                    <Button onClick={() => deleteCharacter(character.id)}>
                      <p className="text-sm">Supprimer</p>
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
