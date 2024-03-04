"use client ";

import Card from "@/components/commons/Card";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { CHARACTERS } from "@/utils/characters";

export default function Type({ params }) {
  const { type } = params;

  const charactersOfType = CHARACTERS.filter((char) => char.type === type);

  if (charactersOfType.length === 0) {
    return <div>Aucun personnage trouvé avec le type {type}</div>;
  }

 

  return (
    <div>
      <h3 className="mb-3 text-center">Les personnages de type {type}</h3>
      <ButtonsTypes/>
      <div className="grid w-full grid-cols-2 gap-4 mx-auto my-4 md:grid-cols-3 lg:grid-cols-4">
        {charactersOfType.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
