import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useApiMutation(
  apiFn,
  queryKey,
  onSuccessCallback,
  onError
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: apiFn,
    onSuccess: (data) => {
      if (queryKey) {
        queryClient.invalidateQueries({ queryKey: [queryKey], exact: false });
      }
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError,
  });
}
