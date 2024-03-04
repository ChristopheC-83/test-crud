import { useQuery } from "react-query";
import axios from "axios";

const getCharacterById = (id)=> async()=> {
  // avec axios, la method est dans la ligne d'appel
  //  pas besoin de response.json()... tout arrive directement en json.
  console.log("getCharacterById", id);
  const { data } = await axios.get(`/api/character/${id}`);
  return data;
}

export function useCharacter(id) {
  return useQuery({
    // permet à reactquery de savoir comment identifier cette requête
    queryKey: ["character", id],
    // la fonction du hook
    queryFn: getCharacterById(id),
    // seulement si on a l'id
    enabled: !!id,
  });
}
