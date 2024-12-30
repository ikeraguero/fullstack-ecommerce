import { useCallback, useEffect, useState } from "react";

function useDashboardItem(initialData, actions) {
  const { create, update, remove, refetch } = actions;

  const [data, setData] = useState([]);

  useEffect(function () {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  });

  const handleAdd = useCallback(
    (formData) => {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }
      create(formData);
    },
    [create]
  );

  const handleEdit = useCallback(
    (formData) => {
      update(formData);
    },
    [update]
  );

  const handleRemove = useCallback(
    (id) => {
      remove(id);
      refetch();
    },
    [remove, refetch]
  );

  return { data, handleAdd, handleEdit, handleRemove };
}

export default useDashboardItem;
