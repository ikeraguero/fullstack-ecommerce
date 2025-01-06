import { useDeleteUsers, useUpdateUser } from "../../api/users/user.api";
import { useRegisterUser } from "../../api/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { resetUserForm, toggleAddUser } from "../../actions/userFormActions";

export function useUserActions(editUser, refetch) {
  const loggedUserId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();
  const { mutate: registerUser } = useRegisterUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUsers();

  // const formatUserData = (formData, editUser) => ({
  //   email: formData.get("userEmail"),
  //   password: formData.get("userPassword"),
  //   firstName: formData.get("userFirstName"),
  //   lastName: formData.get("userLastName"),
  //   roleId: Number(formData.get("userRole")),
  //   ...(editUser && { userId: editUser.userId }),
  // });

  function create(userData) {
    // const userData = formatUserData(formData);
    registerUser(userData, {
      onSuccess: () => {
        dispatch(toggleAddUser());
        refetch();
      },
    });
  }

  function update(userData) {
    // const userData = formatUserData(formData, editUser);

    updateUser(userData, {
      onSuccess: () => {
        dispatch(resetUserForm());
        refetch();
      },
    });
  }

  function remove(userId) {
    if (userId === loggedUserId) return alert("Can't remove logged user");
    deleteUser(userId, {
      onSuccess: refetch,
    });
  }

  return { create, update, remove };
}
