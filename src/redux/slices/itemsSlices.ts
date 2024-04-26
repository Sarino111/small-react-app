

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface ItemsState {
    items: Item[];
}

const initialStateItems: ItemsState = {
    items: [],
};
  

const itemsSlice = createSlice({
    name: 'items',
    initialState: initialStateItems,
    reducers: {
        setItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload;
        },
        addItem(state, action: PayloadAction<Item>) {
            state.items.push(action.payload);
        },
        updateItem(state, action: PayloadAction<Item>) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
              state.items[index] = action.payload;
            }
        },
        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
    }
});

// Export actions
export const { setItems, addItem, updateItem, removeItem } = itemsSlice.actions;

// Export reducers
export const itemsReducer = itemsSlice.reducer;