import { useQueries, useQuery } from "react-query";
import { api } from "@services/api-service";
import { errorMessageState } from "@states/errorMessageState";
import { useSetRecoilState } from "recoil";

async function fetchData({ queryKey: [dataPath, params, body] }) {
  const res = body
    ? await api.post(dataPath, body)
    : await api.get(dataPath, { params });

  return res.data;
}

export function useApiQuery({
  dataPath,
  label,
  params,
  body,
  options,
  fetchOnce,
}) {
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const defaultOptions = {
    onError: (error) => {
      setErrorMessage(`חלה שגיאה בטעינת ${label ?? "המידע"}`);
      console.error(error);
    },
  };

  if (fetchOnce) {
    defaultOptions.refetchInterval = false;
    defaultOptions.staleTime = Infinity;
  }

  return useQuery([dataPath, params, body], fetchData, {
    ...defaultOptions,
    ...options,
  });
}

export function useApiQueries(apiQueries) {
  const setErrorMessage = useSetRecoilState(errorMessageState);

  const queries = apiQueries.map(
    ({ dataPath, label, params, options, fetchOnce }) => {
      const defaultOptions = {
        onError: (error) => {
          setErrorMessage(`חלה שגיאה בטעינת ${label ?? "המידע"}`);
          console.error(error);
        },
      };

      if (fetchOnce) {
        defaultOptions.refetchInterval = false;
        defaultOptions.staleTime = Infinity;
      }

      return {
        queryKey: [dataPath, params],
        queryFn: fetchData,
        onError: (error) => {
          setErrorMessage(`חלה שגיאה בטעינת ${label ?? "המידע"}`);
          console.error(error);
        },
        ...defaultOptions,
        ...options,
      };
    }
  );

  return useQueries(queries);
}
