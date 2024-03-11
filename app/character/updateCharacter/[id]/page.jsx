/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import BioEditor from "@/components/utilities/BioEditor";
import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import InputLabelBtn from "@/components/utilities/InputLabelBtn";
import { useCharacter } from "@/hooks/useCharacter";
import { useDeleteCharacterById } from "@/hooks/useDeleteCharacterById";
import { useTypes } from "@/hooks/useTypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Character({ params }) {
  const { id } = params;
  const { data: session } = useSession();

  if (session) {
    console.log(session.user.role);
  }

  // on renomme les données data en "character"
  const { data: character, isFetching, error } = useCharacter(id);
  const { data: types, isFetching: fetchingTypes } = useTypes();
  const deleteCharacter = useDeleteCharacterById();

  const [characterData, setCharacterData] = useState();
  useEffect(() => {
    setCharacterData(character);
  }, [character]);

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

  // vérification des données > 0 obligatoirement
  function verificationInputs(characteristic, newValue) {
    if (!newValue || newValue <= 0) {
      toast.error(`${characteristic} doit avoir une valeur positive.`);
      return false;
    }
    return true;
  }

  // MAJ dans la BDD
  async function updateCharacteristic(characteristic, newValue) {
    try {
      const response = await axios.patch(`/api/character/${character.id}`, {
        characteristic,
        newValue,
      });

      if (response.status !== 200) {
        throw new Error("Erreur lors de la modification de la caractéristique");
      }
      setCharacterData({ ...characterData, [characteristic]: newValue });
      return true;
    } catch (error) {
      console.error(
        "Erreur lors de la modification de la caractéristique.",
        error
      );
    }
  }

  // on recup une valeur et une caracteristique à mettre à jour
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
      <div className="flex flex-col gap-6 mx-auto sm:flex-row w-fit">
        <div className="max-h-[400px] max-w-[400px] aspect-square">
          <Image
            src={character.avatar}
            alt={character.name}
            width={400}
            height={400}
            objectFit="cover"
            className="mx-auto : sm:mx-0 aspect-square"
            loading="lazy"
          />
        </div>
        <div className="w-fit">
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
              <p>Points de Vie :</p> <p>{characterData?.pv}</p>
            </div>
            <InputLabelBtn
              label="Nouveaux PV"
              type="number"
              name="pv"
              defaultValue={character.pv}
              onClick={() => prepareUpdateCharacteristic("pv")}
            />
            <div className="flex justify-between">
              <p>Points de Magie :</p> <p>{characterData?.pm}</p>
            </div>
            <InputLabelBtn
              label="Nouveaux PM"
              type="number"
              name="pm"
              defaultValue={character.pm}
              onClick={() => prepareUpdateCharacteristic("pm")}
            />
            <div className="flex justify-between">
              <p>Constitution :</p> <p>{characterData?.constit}</p>
            </div>
            <InputLabelBtn
              label="Nouvelle Constitution"
              type="number"
              name="constit"
              defaultValue={character.constit}
              onClick={() => prepareUpdateCharacteristic("constit")}
            />
            <div className="flex justify-between">
              <p>Dexterité :</p> <p>{characterData?.dex}</p>
            </div>
            <InputLabelBtn
              label="Nouvelle Dextérité"
              type="number"
              name="dex"
              defaultValue={character.dex}
              onClick={() => prepareUpdateCharacteristic("dex")}
            />
            <BioEditor character={character} />

            {session?.user?.role === "ADMIN" && (
              <div className="flex justify-between w-[200px] mt-6">
                <Link href="/">
                  <Button onClick={() => deleteCharacter(character.id)}>
                    <p className="text-sm">Supprimer le personnage</p>
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
