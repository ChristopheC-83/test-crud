import { useQuery } from "react-query";
import axios from "axios";

export function useTypes() {
  return useQuery("types", async () => {
    const { data } = await axios.get(`/api/types`);
    return data;
  });
}
