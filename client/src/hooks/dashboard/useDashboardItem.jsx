import { useCallback, useEffect, useState } from "react";

function useDashboardItem(initialData, actions) {
  const { create, edit: update, remove, refetch } = actions;
  const [data, setData] = useState([]);

  useEffect(function () {
    if (initialData && initialData.length > 0) {
      setData(initialData);
    }
  });

  const handleAdd = useCallback(
    (formData) => {
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
    },
    [remove, refetch]
  );

  return { data, handleAdd, handleEdit, handleRemove };
}

export default useDashboardItem;
