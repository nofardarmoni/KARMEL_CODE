import { useApiQuery } from "./useApiQuery";

export function useEnv() {
  const { data } = useApiQuery({
    dataPath: "env",
    label: "משתני סביבה",
    fetchOnce: true,
  });

  return data;
}
