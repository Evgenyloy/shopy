import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  guest: true,
  email: null,
  token: null,
  id: null,
  favorites: [],
  orders: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.guest = false;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
      state.orders = [];
      state.favorites = [];
      state.guest = true;
    },
    setFavoriteItems: (state, action) => {
      state.favorites = action.payload;
    },
    addFavoriteItem: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavoriteItem: (state, action) => {
      state.favorites = state.favorites.filter(
        (item) => item.id !== action.payload
      );
    },
    changeQuantity: (state, action) => {
      state.orders.map((item) => {
        if (item.id == action.payload[0]) {
          return (item.quantity = action.payload[1]);
        }
      });
    },
    addOrder: (state, action) => {
      state.orders.push({
        quantity: 1,
        id: action.payload.id,
        price: action.payload.price,
        image: action.payload.image,
        title: action.payload.title,
      });
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  setUser,
  removeUser,
  addFavoriteItem,
  removeFavoriteItem,
  setFavoriteItems,
  changeQuantity,
  removeOrder,
  addOrder,
  setOrders,
} = userSlice.actions;
export default userSlice.reducer;
