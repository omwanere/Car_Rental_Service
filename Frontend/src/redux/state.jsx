import { createSlice, combineReducers } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const initialUserState = {
  user: null,
  token: null,
  wishList: [],
  carListings: [],
  tripList: [],
  carList: [], // ✅ Added to prevent undefined errors
  reservationList: [], // ✅ Added missing property
};

const initialState = {
  selectedCarId: null,
};

export const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setSelectedCarId: (state, action) => {
      state.selectedCarId = action.payload;
    },
  },
});

export const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user; // ✅ No unnecessary nesting
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      state.tripList = [];
      state.wishList = [];
      state.carList = [];
      state.reservationList = [];
    },
    setListings: (state, action) => {
      if (state.user) {
        state.user.listings = action.payload.listings || [];
      }
    },
    setTripList: (state, action) => {
      if (state.user) {
        state.tripList = action.payload || [];
        console.log("Redux Trip List:", state.tripList);
      }
    },
    setWishList: (state, action) => {
      if (state.user) {
        state.wishList = action.payload || [];
      }
    },
    setCarList: (state, action) => {
      if (state.user) {
        state.carList = action.payload || [];
        console.log("Redux Car List:", state.carList);
      }
    },
    setReservationList: (state, action) => {
      if (state.user) {
        state.reservationList = action.payload || [];
      }
    },
  },
});

const initialCarListingsState = {
  carListings: [],
};

export const carListingsSlice = createSlice({
  name: "carListings",
  initialState: initialCarListingsState,
  reducers: {
    setCarListings: (state, action) => {
      state.carListings = action.payload.listings || [];
    },
  },
});

const getCarListings = (state) => state.carListings.carListings;

export const selectCarListings = createSelector(
  [getCarListings],
  (carListings) => carListings.map((listing) => ({ ...listing }))
);

export const {
  setLogin,
  setLogout,
  setListings,
  setTripList,
  setWishList,
  setCarList,
  setReservationList,
} = userSlice.actions;

export const { setCarListings } = carListingsSlice.actions;

const rootReducer = combineReducers({
  user: userSlice.reducer,
  carListings: carListingsSlice.reducer,
  car: carSlice.reducer,
});

export const { setSelectedCarId } = carSlice.actions;

export default rootReducer;
