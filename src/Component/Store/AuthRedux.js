import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialIdToken = localStorage.getItem("token");
const initialAuthState = {
  token: initialIdToken,
  isLoggedIn: !!initialIdToken,
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.isLoggedIn = true;

      // localStorage.setItem('token',state.token)
    },
    logout(state, action) {
      state.token = action.payload;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      localStorage.removeItem("data");
    },
  },
});

const initialExpenseState = {
  expense: [],
};
const ExpenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    fetchAllexpenses(state, action) {
      state.expense = action.payload;
    },
    addexpense(state, action) {
      state.expense = [...state.expense, action.payload];
    },

    removeExpense(state, action) {
      const id = action.payload;
      const temp = [...state.expense];
      temp.forEach((item, index) => {
        if (id === item.id) {
          temp.splice(index, 1);
        }
      });
      state.expense = temp;
    },
    editExpense(state, action) {
      const id = action.payload.id;
      const temp = [...state.expense];
      temp.forEach((item, index) => {
        if (id === item.id) {
          temp[index] = action.payload;
        }
      });
      state.expense = temp;
    },
  },
});

const initialThemeState = {
  darkMode: "light",
  premium: false,
  cvandDark: false,
};
const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    changeTheme(state, action) {
      state.darkMode = state.darkMode === "light" ? "dark" : "light";
    },
    activePremium(state, action) {
      state.premium = action.payload;
    },
    cvDarkMode(state, action) {
      state.cvandDark = action.payload;
    },
  },
});
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expenseitem: ExpenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});
export const authActions = authSlice.actions;
export const ExpenseAction = ExpenseSlice.actions;
export const themeAction = themeSlice.actions;
export default store;