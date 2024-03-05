
"use client"
import Image from "next/image";
import Link from "next/link";
import Button from "../utilities/Button";

export default function Card({ character }) {
  function handle() {
    console.log("click");
  }
  return (
    <div className="p-2 overflow-hidden border rounded-lg border-amber-100 shadow-amber">
      <div className="relative rounded-lg aspect-square">
        <Link href={`/character/${character.id}`} className="">
          <Image
            src={character.avatar}
            fill
            className="w-10/12 transition-all duration-300 aspect-square hover:scale-105"
            alt={character.name} loading="lazy" 
          />
        </Link>
      </div>
      <h4 className="mt-3 text-center">{character.name}</h4>
      <div className="w-full mt-2 flexMid">
            <Button onClick={handle}>
              <Link className="text-sm" href={`/characters/${character.typeSlug}`}>{character.typeSlug}</Link>
            </Button>
      </div>
      <div className="w-full p-2">
        <div className="flex justify-between px-2">
            <p>PV : {character.pv}</p>
            <p>PM : {character.pm}</p>
        </div>
        <div className="flex justify-between mt-4">
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
  );
}
