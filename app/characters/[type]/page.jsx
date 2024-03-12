"use client";

import Card from "@/components/commons/Card";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useCharactersByType } from "@/hooks/useCharactersByType";
import { useTypes } from "@/hooks/useTypes";


export default function CharactersByType({ params }) {
  const { type } = params;

  const {
    data: charactersByType,
    isFetching,
    error,
  } = useCharactersByType(type);
  const { data: types, isFetching: fetchingTypes } = useTypes();

  if (isFetching) {
    return <div>Chargement en cours...</div>;
  }
  if (fetchingTypes) {
    return <div>Chargement en cours...</div>;
  }
  if (error) {
    return <div>Erreur : {error.message}</div>;
  }
 

  return (
    <div className="w-full">
      <h3 className="mb-2 text-center">Liste de personnages</h3>

      <ButtonsTypes types={types} />

      <div className="grid w-full grid-cols-2 gap-4 mx-auto my-4 md:grid-cols-3 lg:grid-cols-4">
        {charactersByType.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}
