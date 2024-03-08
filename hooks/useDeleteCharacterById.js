import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteCharacterById() {
  const router = useRouter();

  async function deleteCharacter(id) {
    console.log(id);

    try {
      const response = await axios.delete(`/api/character/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error("Erreur lors de la suppression du personnage");
      }

      toast.success("Personnage supprimé");
      console.log("Personnage supprimé");

      router.push("/");

      
    } catch (error) {
      console.error("Erreur lors de la suppression du personnage.", error);
    }
  }


  return deleteCharacter;
}
