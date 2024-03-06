/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const router = useRouter();

  function validationInputs(name, email, password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || !email || !password) {
      toast.error("Veuillez remplir tous les champs");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Veuillez remplir un email valide");
      return false;
    }
    return true;
  }

  async function prepareCreateUser(formData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const newUser = {
      name: name,
      email: email,
      password: password,
    };

    if (!validationInputs(name, email, password)) {
      return;
    }
    // console.log("name", name);
    // console.log("email", email);
    // console.log("password", password);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      const responseData = await response.json();

      if (response.ok) {
        // replace au lieu de push pour éviter le retour en arrière
        toast.success("User created successfully");
        // router.replace("/");
      } else {
        return toast.error(responseData.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <div className="flex flex-col gap-4 max-w-[400px] mx-auto w-full p-2 sm:p-4 ">
      <h3 className="text-center">S'enregister</h3>
      <form action={prepareCreateUser}>
        <input
          type="text"
          name="name"
          placeholder="Pseudo d'utilisateur"
          className="input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email de l'utilisateur"
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de Passe"
          className="input"
        />
        <Button>
          <p className="text-xl font-bold">Créer un compte</p>
        </Button>
      </form>
      <Link href="/connection" className="customBtn">
        <p className="text-xl font-bold">Connexion</p>
      </Link>
    </div>
  );
}
