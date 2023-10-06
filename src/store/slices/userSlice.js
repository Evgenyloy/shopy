import { createSlice } from '@reduxjs/toolkit';

const userData = JSON.parse(
  localStorage.getItem(
    'firebase:authUser:AIzaSyAWEVRT308MOF8Lo9_aRbLEdHbgLHcf65E:[DEFAULT]'
  )
);

const localUserData = JSON.parse(localStorage.getItem('userData'));
const localGuestData = JSON.parse(localStorage.getItem('guestData'));

const initialState = {
  user: userData ? userData : null,
  favorites: userData
    ? localUserData.favorites
    : localGuestData
    ? localGuestData.favorites
    : [],
  orders: userData
    ? localUserData.orders
    : localGuestData
    ? localGuestData.orders
    : [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = null;
      state.orders = localStorage.getItem('guestData')
        ? JSON.parse(localStorage.getItem('guestData')).orders
        : [];
      state.favorites = localStorage.getItem('guestData')
        ? JSON.parse(localStorage.getItem('guestData')).favorites
        : [];
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
        description: action.payload.description,
      });
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    deleteOrders: (state) => {
      state.orders = [];
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
  deleteOrders,
} = userSlice.actions;
export default userSlice.reducer;
