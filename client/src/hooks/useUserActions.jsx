import { useUsersFormContext } from "./useUsersFormContext";
import { useDeleteUsers, useUpdateUser } from "../api/users/user.api";
import { useRegisterUser } from "../api/auth/auth.api";

export function useUserActions(editUser, refetch) {
  const { dispatch } = useUsersFormContext();
  const { mutate: registerUser } = useRegisterUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUsers();

  const formatUserData = (formData, editUser) => ({
    email: formData.get("userEmail"),
    password: formData.get("userPassword"),
    firstName: formData.get("userFirstName"),
    lastName: formData.get("userLastName"),
    roleId: Number(formData.get("userRole")),
    ...(editUser && { userId: editUser.userId }),
  });

  const create = (formData) => {
    const userData = formatUserData(formData);
    registerUser(userData, {
      onSuccess: () => {
        dispatch({ type: "toggleAdd" });
        refetch();
      },
    });
  };

  const update = (formData) => {
    const userData = formatUserData(formData, editUser);

    updateUser(userData, {
      onSuccess: () => {
        dispatch({ type: "closeEdit" });
        refetch();
      },
    });
  };

  const remove = (userId) => {
    deleteUser(userId, {
      onSuccess: refetch,
    });
  };

  return { create, update, remove };
}
