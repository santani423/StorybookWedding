import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTemaDetail, updateTema } from "./api";

export function useTemaDetail(code: string) {
  return useQuery({
    queryKey: ["tema", code],
    queryFn: () => getTemaDetail(code),
  });
}

export function useUpdateTema(code: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTema,
    onSuccess: (data) => {
      if (data?.status === true) {
        queryClient.invalidateQueries({ queryKey: ["tema", code] });
      }
    },
  });
}

