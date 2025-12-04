import { useQuery } from "@tanstack/react-query";

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
  cca3: string;
  flag: string;
}

export default function useCountries() {
  return useQuery({
    queryKey: ["countries"],
    queryFn: async (): Promise<Country[]> => {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,cca3,flag"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }
      const data = await response.json();
      // Sort countries alphabetically by common name
      return data.sort((a: Country, b: Country) =>
        a.name.common.localeCompare(b.name.common)
      );
    },
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - countries don't change often
    gcTime: 1000 * 60 * 60 * 24, // 24 hours
  });
}
