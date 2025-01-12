import { useDeleteUsers, useUpdateUser } from "../../api/users/user.api";
import { useRegisterUser } from "../../api/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { useUserForm } from "@context/useUserFormContext";

export function useUserActions(editUser, refetch) {
  const loggedUserId = useSelector((state) => state.auth.id);
  const { resetUserForm, toggleAdd } = useUserForm();
  const dispatch = useDispatch();
  const { mutate: registerUser } = useRegisterUser();
  const { mutate: updateUser } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUsers();

  console.log(resetUserForm, toggleAdd);

  function create(userData) {
    registerUser(userData, {
      onSuccess: () => {
        dispatch(toggleAdd());
        refetch();
      },
    });
  }

  function update(userData) {
    updateUser(userData, {
      onSuccess: () => {
        refetch();
      },
    });
  }

  function remove(userId) {
    if (userId === loggedUserId) return alert("Can't remove logged user");
    deleteUser(userId, {
      onSuccess: refetch(),
    });
  }

  return { create, update, remove };
}
