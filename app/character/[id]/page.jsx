/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { CHARACTERS } from "@/utils/characters";
import Image from "next/image";
import Link from "next/link";

export default function Character({ params }) {
  const { id } = params;

  const ch = CHARACTERS.find((char) => char.id === id);

  if (!ch) {
    return <div>Aucun personnage trouvé avec l'ID {id}</div>;
  }

  function handle() {
    console.log("click");
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">{ch.name} en détails !</h3>
      <ButtonsTypes />
      <div className="flex flex-col gap-6 sm:flex-row">
        <Image
          src={ch.avatar}
          alt={ch.name}
          width={400}
          height={400}
          className="mx-auto : sm:mx-0"
        />
        <div className="w-full">
          <h3 className="text-center">{ch.name}</h3>

          <Button onClick={handle}>
            <Link className="text-sm" href={`/type/${ch.type}`}>
              {ch.type}
            </Link>
          </Button>
          <div className="mx-auto w-fit sm:mx-0">
            <div className="flex justify-between">
              <p>Points de Vie :</p> <p>{ch.pv}</p>
            </div>
            <div className="flex justify-between">
              <p>Points de Magie :</p> <p>{ch.pm}</p>
            </div>
            <div className="flex justify-between">
              <p>Constitution :</p> <p>{ch.constitution}</p>
            </div>
            <div className="flex justify-between">
              <p>Dexterité :</p> <p>{ch.dexterité}</p>
            </div>
            <p className="my-2">Biographie : {ch.bio}</p>
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
