import { useQuery } from "react-query";
import axios from "axios";

export function useCharacters() {
  return useQuery("characters", async () => {
    const { data } = await axios.get(`/api/characters`);
    return data;
  });
}
