/* eslint-disable react/no-unescaped-entities */
"use client";
import Button from "@/components/utilities/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";



 export default function Register() {


    const router = useRouter();

    function validationInputs(email, password) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !password) {
        toast.error("Veuillez remplir tous les champs");
        return false;
      }
      if (!emailRegex.test(email)) {
        toast.error("Veuillez remplir un email valide");
        return false;
      }
      return true;
    }
  
    async function prepareLogin(formData) {
      const email = formData.get("email");
      const password = formData.get("password");
      if (!validationInputs(email, password)) {
        return;
      }
      try {
        // nous utilisons ici le provider Credentials
        const response = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
  
        if (response.error) {
          return toast.error(response.error);
        }
      } catch (error) {
        toast.error(error.message);
      }
      toast.success("Vous êtes connecté !");
      // replace au lieu de push pour éviter le retour en arrière
      router.replace("/");
    }
  return (
    <div className="flex flex-col gap-4 max-w-[400px] mx-auto w-full p-2 sm:p-4 ">
        <h3 className="text-center">S'enregister</h3>
      <form action={prepareLogin}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="input"
        />
        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo de l'utilisateur"
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
          <p className="text-xl font-bold">Se Connecter</p>
        </Button>
      </form>
      <Link href="/connection" className="customBtn">
        <p className="text-xl font-bold">Créer un compte</p>
      </Link>
    </div>
  );
}
