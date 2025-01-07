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

  function create(userData) {
    registerUser(userData, {
      onSuccess: () => {
        dispatch(toggleAddUser());
        refetch();
      },
    });
  }

  function update(userData) {

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
