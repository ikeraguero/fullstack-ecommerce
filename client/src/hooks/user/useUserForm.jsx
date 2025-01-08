import { useDispatch, useSelector } from "react-redux";
import { openEdit, resetForm, toggleAdd } from "../../reducers/userFormSlice";

function useUserForm() {
  const dispatch = useDispatch();
  const userFormState = useSelector((state) => state.userForm);
  const isEditingUser = useSelector((state) => state.userForm.isEditingUser);
  const isAddingUser = useSelector((state) => state.userForm.isAddingUser);
  const editUser = useSelector((state) => state.userForm.editUser);
  const users = useSelector((state) => state.userForm.users);

  function toggleAddUserForm(payload) {
    dispatch(toggleAdd(payload));
  }

  function editUserOpen(payload) {
    dispatch(openEdit(payload));
  }

  function reset() {
    dispatch(resetForm());
  }

  return {
    userFormState,
    users,
    toggleAddUserForm,
    editUserOpen,
    reset,
    editUser,
    isAddingUser,
    isEditingUser,
  };
}

export default useUserForm;
