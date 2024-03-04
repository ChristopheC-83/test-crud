"use client";

import { useState, useEffect } from "react";

export default function TestPage() {
  const [perso, setPerso] = useState([]);

  async function getCharacter() {
    try {
      const response = await fetch("/api/characters/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setPerso(data);
    } catch (error) {
      console.error("Erreur de récupération du personnage", error);
    }
  }
  let toAdd = 7;

  async function patchCharacter() {
    let data = { amountToAdd: toAdd };
    try {
      const response = await fetch("/api/characters/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amountToAdd: toAdd }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification du personnage");
      }

      console.log("data", data);
      console.log("PV du personnage augmentés de ", toAdd, " points.");
      getCharacter();
    } catch (error) {
      console.error("Erreur lors de la modification du personnage.", error);
    }
  }

  async function deleteCharacter() {
    try {
      const response = await fetch("/api/characters/2", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la Suppression du personnage");
      }
      console.log("Personnage supprimé");
    } catch (error) {
      console.error("Erreur lors de la modification du personnage.", error);
    }
  }

  async function createCharacter() {
    try {
      const response = await fetch("/api/characters/1", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ name: "Kiki" }),
      });
      console.log("c'est parti")
      if (!response.ok) {
        throw new Error("Erreur lors de la création du personnage");
      }
      console.log("Personnage créé");
    } catch (error) {
      console.error("Erreur lors de la création du personnage.", error);
    }
  }
  

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div>
      <h3>Recup</h3>
      <p>{perso.name}</p>
      <p>{perso.pv}</p>
      <button
        onClick={patchCharacter}
        className="p-2 border rounded-lg border-amber-100 bg-slate-600 hover:bg-slate-700"
      >
        pv + {toAdd}
      </button>
      <br />
      <br />
      <button
        onClick={deleteCharacter}
        className="p-2 border rounded-lg border-amber-100 bg-slate-600 hover:bg-slate-700"
      >
        Supprimer Personnage
      </button>
      <br />
      <br />
      <button
        onClick={createCharacter}
        className="p-2 border rounded-lg border-amber-100 bg-slate-600 hover:bg-slate-700"
      >
        Créer Personnage
      </button>
    </div>
  );
}
