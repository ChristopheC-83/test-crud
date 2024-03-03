"use client ";

import { CHARACTERS } from "@/utils/characters";

export default function Type({ params }) {
  const { type } = params;

  const charactersOfType = CHARACTERS.filter((char) => char.type === type);

  if (charactersOfType.length === 0) {
    return <div>Aucun personnage trouvé avec le type {type}</div>;
  }

  function handle() {
    console.log("click");
  }

  return (
    <div>
      <h3 className="text-center">les personnages de type {type}</h3>
      {charactersOfType.map((char) => (
          <div key={char.id}>{char.name}</div>
          
        ))}
    </div>
  );
}
