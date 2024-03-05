/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useCharacter } from "@/hooks/useCharacter";
import { CHARACTERS } from "@/utils/characters";
import Image from "next/image";
import Link from "next/link";

export default function Character({ params }) {
  const { id } = params;

  // on renomme les données data en "character"

  const { data : character , isFetching, error} = useCharacter(id);

  
  function handle() {
    console.log("click");
  }
  
  if (isFetching) {
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
      <ButtonsTypes />
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
            <Link className="text-sm" href={`/type/${character.type}`}>
              {character.type}
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
              <p>Constitution :</p> <p>{character.const}</p>
            </div>
            <div className="flex justify-between">
              <p>Dexterité :</p> <p>{character.dext}</p>
            </div>
            <p className="my-2">Biographie : {character.bio}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}
