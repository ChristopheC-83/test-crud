/* eslint-disable react/no-unescaped-entities */
"use client";

import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import InputLabel from "@/components/utilities/InputLabel";
import { useCharacters } from "@/hooks/useCharacters";
import { useTypes } from "@/hooks/useTypes";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateCharacter() {
  const { data: characters } = useCharacters();
  const { data: types, isFetching, error } = useTypes();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    toast.error("Vous devez être connecté pour accéder à cette page");
    router.replace("/connection");
  }
  if (isFetching) {
    return <div>Chargement en cours...</div>;
  }
  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  function verificationInputs(name, avatar, type) {
    if (!name || !avatar || !type) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (characters.find((character) => character.name === name)) {
      toast.error("Ce nom est déjà utilisé");
      return false;
    }

    if (characters.find((character) => character.name === name)) {
      toast.error("Ce nom est déjà utilisé");
      return false;
    }

    return true;
  }

  async function createCharacter(newCharacter) {
    try {
      const response = await axios.post("/api/characters", newCharacter, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.status === 200) {
        throw new Error("Erreur lors de la création du personnage");
      }
      router.push("/");
      toast.success("Création réussie de " + newCharacter.name);
    } catch (error) {
      toast.error("Erreur lors de la création du personnage");
    }
  }

  function prepareCreateCharacter(formData) {
    const name = formData.get("name");
    const avatar = formData.get("avatar");
    const typeSlug = formData.get("typeSlug");
    const pv = formData.get("pv");
    const pm = formData.get("pm");
    const dex = formData.get("dex");
    const constit = formData.get("constit");
    const newCharacter = {
      name,
      avatar,
      typeSlug,
      pv,
      pm,
      dex,
      constit,
    };
    if (!verificationInputs(name, avatar, typeSlug)) {
      return;
    }

    createCharacter(newCharacter);
  }

  return (
    <div className="w-full">
      <h3 className="mb-2 text-center">Liste de personnages</h3>
      <ButtonsTypes types={types} />
      <div className="flex flex-col gap-4 max-w-[600px] mx-auto w-full p-2 sm:p-4 ">
        <form action={prepareCreateCharacter}>
          <InputLabel label="Nom" type="text" name="name" />
          <InputLabel label="Avatar" type="text" name="avatar" />

          {isFetching ? (
            <p>Chargement...</p>
          ) : (
            <select
              type="text"
              name="typeSlug"
              placeholder="Type"
              className="input"
            >
              <option  className="hover:bg-red-200">Type du personnage</option>
              {types.map((type) => (
                <option key={type.id} value={type.slug} className="hover:bg-red-200">
                  {type.type}
                </option>
              ))}
            </select>
          )}
          <InputLabel
            label="Points de Vie"
            type="number"
            name="pv"
            defaultValue="10"
          />
          <InputLabel
            label="Points de Magie"
            type="number"
            name="pm"
            defaultValue="10"
          />
          <InputLabel
            label="Points de Dextérité"
            type="number"
            name="dex"
            defaultValue="10"
          />
          <InputLabel
            label="Points de Constitution"
            type="number"
            name="constit"
            defaultValue="10"
          />
          <Button>
            <p className="text-xl font-bold">Créer le personnage</p>
          </Button>
        </form>
      </div>
    </div>
  );
}
