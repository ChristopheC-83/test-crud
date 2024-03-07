/* eslint-disable react/no-unescaped-entities */
"use client";

import Button from "@/components/utilities/Button";
import ButtonsTypes from "@/components/utilities/ButtonsTypes";
import { useTypes } from "@/hooks/useTypes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CreateCharacter() {
  const { data: types, isFetching, error } = useTypes();
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/connection");
  }
  if (isFetching) {
    return <div>Chargement en cours...</div>;
  }
  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  async function prepareCreateCharacter(formData) {
    const name = formData.get("name");
    const avatar = formData.get("avatar");
    const type = formData.get("type");
    const newCharacter = {
      name: name,
      avatar:avatar,
      type: type,
    };
    console.log("newCharacter", newCharacter);
  }

  return (
    <div className="w-full">
      <h3 className="mb-2 text-center">Liste de personnages</h3>
      <ButtonsTypes types={types} />
      <div className="flex flex-col gap-4 max-w-[600px] mx-auto w-full p-2 sm:p-4 ">
        <form action={prepareCreateCharacter}>
          <input
            type="text"
            name="name"
            placeholder="Nom du personnage"
            className="input"
          />
          <input
            type="text"
            name="avatar"
            placeholder="Avatar"
            className="input"
          />

          {isFetching ? (
            <p>Chargement...</p>
          ) : (
            <select
              type="text"
              name="type"
              placeholder="Type"
              className="input"
            >
              <option>Type du personnage</option>
              {types.map((type) => (
                <option key={type.id} value={type.slug}>
                  {type.type}
                </option>
              ))}
            </select>
          )}
           <Button>
          <p className="text-xl font-bold">Créer le personnage</p>
        </Button>
        </form>
      </div>
    </div>
  );
}
