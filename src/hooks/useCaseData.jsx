import { useQueries } from "@tanstack/react-query";
import { fetchCases, fetchOther } from "../queries/fetchData";

export function useCaseData(category) {
  const results = useQueries({
    queries: [
      {
        queryKey: ["cases"],
        queryFn: fetchCases,
        refetchOnMount: false,
      },
      {
        queryKey: ["other"],
        queryFn: fetchOther,
        refetchOnMount: false,
      },
    ],
  });

  const [casesQuery, otherQuery] = results;
  let data = [];
  let isLoading = false;
  let isError = false;

  if (category === "case") {
    data = casesQuery.data ?? [];
    isLoading = casesQuery.isLoading;
    isError = !!casesQuery.error;
  } else if (category === "other") {
    data = otherQuery.data ?? [];
    isLoading = otherQuery.isLoading;
    isError = !!otherQuery.error;
  }
  return { data, isLoading, isError };
}
