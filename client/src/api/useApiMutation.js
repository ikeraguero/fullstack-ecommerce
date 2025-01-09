import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useApiMutation(
  apiFn,
  queryKey,
  onSuccessCallback,
  onError,
  additionalQueryKeys = []
) {
  const queryClient = useQueryClient();
  console.log(additionalQueryKeys);
  return useMutation({
    mutationFn: apiFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
      }
      additionalQueryKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key], exact: false });
      });
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError,
  });
}
