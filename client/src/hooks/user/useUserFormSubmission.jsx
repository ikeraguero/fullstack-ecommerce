function useUserFormSubmission(
  isEditingUser,
  editUser,
  resetUserForm,
  onAdd,
  onEdit
) {
  const handleSendData = (e, values) => {
    e.preventDefault();

    const userRequest = {
      userId: editUser?.id || null,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roleId: Number(values.roleId),
      address: {
        addressId: editUser?.userAddress?.id || null,
        address: values.address,
        postalCode: values.postalCode,
        country: values.country,
        city: values.city,
      },
    };

    console.log(userRequest);

    if (isEditingUser) {
      onEdit(userRequest);
      resetUserForm();
      return;
    }

    onAdd(userRequest);
    resetUserForm();
  };

  return { handleSendData };
}

export default useUserFormSubmission;
