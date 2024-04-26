

import { itemsReducer, } from './slices/itemsSlices';


import { configureStore, combineReducers } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  allItems: itemsReducer,
});

const store = configureStore({
  reducer: rootReducer
})

export default store;