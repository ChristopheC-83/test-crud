
"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function BioEditor({ character }) {
  const [newBio, setNewBio] = useState(character.bio);

  // Garde à jour le textarea dans un state
  const prepareBio = (event) => {
    setNewBio(event.target.value);
  };

  // Envoi des données
  async function  sendNewBio(bio){
   
    console.log("bio", bio);
    try {
      const response = await axios.patch(`/api/updateBio/${character.id}`, bio, {
        headers: {
          "Content-Type": "multipart/json", 
        },
      });
      console.log ("on est parti ?")
      if (response.status !== 200) {
        throw new Error("Erreur lors de la MAJ de la bio du personnage");
      }

      console.log("Biographie mise à jour avec succès !");
      toast.success("Biographie mise à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la modification de la biographie :", error);
      toast.error("Erreur lors de la modification de la biographie");
    }
  };

  function prepareSendNewBio(formData){
    const newBio2 = formData.get("bio");
    if(newBio2.trim() === "") {
      toast.error("Veuillez remplir la biographie");
      return;

    }
    const updatedBio = { bio: newBio2 };
    sendNewBio(updatedBio);
  }

  return (
    <form action={prepareSendNewBio}>
      <label className="w-1/2" htmlFor="bio">
        <p>Biographie</p>
      </label>
      <textarea
        className="w-full p-3 resize-none md:text-lg sm:text-md h-72 font-semi-bold text-amber-100 bg-neutral-800 rounded-xl placeholder:text-amber-100 "
        value={newBio}
        onChange={prepareBio}
        id="bio"
        name="bio"
      ></textarea>
      <button
       type="submit"
        className="p-2 mt-4 duration-200 rounded-xl bg-amber-100 text-slate-800 hover:bg-slate-800 hover:text-amber-200 w-fit"
      >
        Enregistrer la biographie
      </button>
    </form>
  );
}
