import useUserForm from "./useUserForm";
import useUserFormBase from "./useUserFormBase";
import { useLocation } from "react-router-dom";
import useAuth from "@hooks/auth/useAuth";

function useUserEditForm(onSubmitCallback) {
  const { isEditingUser, editUser } = useUserForm();
  const location = useLocation();
  const { firstName, lastName, email, roleId } = useAuth();

  const initialData =
    location.pathname === "/profile"
      ? { firstName, lastName, email, password: "", roleId }
      : isEditingUser
      ? {
          firstName: editUser?.userFirstName || "",
          lastName: editUser?.userLastName || "",
          email: editUser?.userEmail || "",
          password: "",
          roleId: editUser?.userRoleId || "",
        }
      : {};

  return useUserFormBase(onSubmitCallback, initialData);
}

export default useUserEditForm;
