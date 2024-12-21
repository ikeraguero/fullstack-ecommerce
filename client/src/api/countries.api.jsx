import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchCountries() {
  const res = await axios.get("https://restcountries.com/v3.1/all");
  return res.data;
}

export function useCountries() {
  return useQuery({
    queryFn: () => fetchCountries(),
    queryKey: ["countries"],
  });
}
