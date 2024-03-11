"use client";
import { useState } from "react";

export default function BioEditor({ character }) {
  const [newBio, setNewBio] = useState(character.bio);

  //   garde à jour le textarea dans un state
  const prepareBio = (event) => {
    setNewBio(event.target.value);
    console.log("1", event.target.value);
  };

//   envoi des données
  const handleSubmit = (event) => {
    event.preventDefault();
    onUpdateBio(newBio);
    console.log("2", event.target.value);
  };

  return (
    <form>
      <label className="w-1/2" htmlFor="bio">
        <p>Biographie</p>
      </label>
      <textarea
        className="w-full p-3 resize-none md:text-lg sm:text-md h-72 font-semi-bold text-amber-100 bg-neutral-800 rounded-xl placeholder:text-amber-100 "
        placeholder={`La vie de ${character.name} `}
        value={newBio}
        onChange={prepareBio}
        id="bio"
        name="bio"
      ></textarea>
      <button
        type="submit"
        className="p-2 duration-200 rounded-xl hover:bg-slate-800 hover:text-amber-200"
      >
        Enregistrer la biographie
      </button>
    </form>
  );
}
