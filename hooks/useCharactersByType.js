import { useQuery } from "react-query";
import axios from "axios";

const getCharactersByType = (type) => async () => {
  // console.log("getCharactersByType", type);
  const { data } = await axios.get(`/api/characters/${type}`);
  return data;
};

export function useCharactersByType(type) {
  return useQuery({
    queryKey: ["charactersByType", type],
    queryFn: getCharactersByType(type),
    enabled: !!type,
  });
}
