import { createSlice } from "@reduxjs/toolkit";

function createFormSlice(name, fields, initialStateOverrides = {}) {
  const initialState = {
    isAdding: false,
    isEditing: false,
    isDeleting: false,
    deleteId: null,
    editItem: null,
    ...fields.reduce((acc, field) => ({ ...acc, [field]: null }), {}),
    ...initialStateOverrides,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      toggleAdd(state) {
        state.isAdding = !state.isAdding;
      },
      toggleDelete(state, action) {
        state.isDeleting = !state.isDeleting;
        state.deleteId = action.payload;
      },
      openEdit(state, action) {
        const item = action.payload;
        state.isAdding = false;
        state.isEditing = true;
        state.editItem = item;
        fields.forEach((field) => {
          state[field] = item[field] || null;
        });
      },
      closeEdit(state) {
        state.isEditing = false;
        state.editItem = null;
        fields.forEach((field) => {
          state[field] = null;
        });
      },
      resetForm() {
        return initialState;
      },
      updateField(state, action) {
        const { field, value } = action.payload;
        if (field in state) {
          state[field] = value;
        }
      },
    },
  });

  return slice;
}

export default createFormSlice;
