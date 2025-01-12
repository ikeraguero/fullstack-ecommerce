import useUserFormBase from "./useUserFormBase";
import { useLocation } from "react-router-dom";
import useAuth from "@hooks/auth/useAuth";
import { useUserForm } from "@context/useUserFormContext";

function useUserEditForm(onSubmitCallback) {
  const { isEditingUser, editUser } = useUserForm();
  const location = useLocation();
  const { firstName, lastName, email, roleId, address } = useAuth();

  const initialData =
    location.pathname === "/profile"
      ? {
          firstName,
          lastName,
          email,
          password: "",
          roleId,
          addressId: address?.address,
          address: address?.address,
          postalCode: address?.postalCode,
          country: address?.country,
          city: address?.city,
        }
      : isEditingUser
      ? {
          firstName: editUser?.userFirstName || "",
          lastName: editUser?.userLastName || "",
          email: editUser?.userEmail || "",
          password: "",
          roleId: editUser?.userRoleId || "",
          addressId: editUser?.userAddress?.id,
          address: editUser?.userAddress?.address,
          postalCode: editUser?.userAddress?.postalCode,
          country: editUser?.userAddress?.country,
          city: editUser?.userAddress?.city,
        }
      : {};

  return useUserFormBase(onSubmitCallback, initialData);
}

export default useUserEditForm;
