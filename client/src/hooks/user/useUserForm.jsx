import { useSelector } from "react-redux";

function useUserForm() {
  const userFormState = useSelector((state) => state.userForm);
  const users = useSelector((state) => state.userForm.users);

  return { userFormState, users };
}

export default useUserForm;
