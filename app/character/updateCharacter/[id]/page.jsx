/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import InputLabelBtn from "@/components/utilities/InputLabelBtn";
import { useCharacter } from "@/hooks/useCharacter";
import { useDeleteCharacterById } from "@/hooks/useDeleteCharacterById";
import { useTypes } from "@/hooks/useTypes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Character({ params }) {
  const { id } = params;

  // on renomme les données data en "character"
  const { data: character, isFetching, error } = useCharacter(id);
  const { data: types, isFetching: fetchingTypes } = useTypes();
  const deleteCharacter = useDeleteCharacterById();

  const [characterData, setCharacterData] = useState();
  useEffect(() => {
    setCharacterData(character)
  }, [character])

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

  function verificationInputs(characteristic, newValue) {
    if (!newValue || newValue <= 0) {
      toast.error(`${characteristic} doit avoir une valeur positive.`);
      return false;
    }
    return true;
  }

  async function updateCharacteristic(characteristic, newValue) {
    console.log(character.id, characteristic, newValue);
    console.log(character)
    try {
      const response = await axios.patch(`/api/character/${character.id}`, {
        characteristic,
        newValue,
      });

      if (response.status !== 200) {
        throw new Error("Erreur lors de la modification de la caractéristique");
      }
      setCharacterData(characterData[characteristic] = newValue)
      return true;
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la caractéristique.",
        error
      );
    }
  }

  function prepareUpdateCharacteristic(characteristic) {
    const input = document.querySelector(`input[name="${characteristic}"]`);
    const newValue = parseInt(input.value);

    if (!verificationInputs(characteristic, newValue)) {
      return;
    }
    if (updateCharacteristic(characteristic, newValue)) {
      toast.success(`${characteristic} mise à jour`);
    } else {
      toast.error(`${characteristic} non mise à jour`);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-center">Modifions {character.name} !</h3>
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

          <Button>
            <Link
              className="text-sm"
              href={`/characters/${character.typeSlug}`}
            >
              {character.typeSlug}
            </Link>
          </Button>
          <div className="mx-auto my-4 w-fit sm:mx-0">
            <div className="flex justify-between">
              <p>Points de Vie :</p> <p>{character.pv}</p>
            </div>

            <InputLabelBtn
              label="Nouveaux PV"
              type="number"
              name="pv"
              defaultValue={character.pv}
              onClick={() => prepareUpdateCharacteristic("pv")}
            />
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
            <div className="flex justify-between w-[200px] mt-6">
              <Link href="/">
                <Button onClick={() => deleteCharacter(character.id)}>
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
