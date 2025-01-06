import { useSelector } from "react-redux";

function useUserState() {
  const userFormState = useSelector((state) => state.userForm);
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.id);
  const email = useSelector((state) => state.auth.email);
  const username = useSelector((state) => state.auth.username);
  const users = useSelector((state) => state.userForm.users);
  return { userFormState, role, isLoggedIn, userId, email, username, users };
}

export default useUserState;
