import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: "cartData",
    initialState: {
        items: [],
        payment: 0,
    }, 
    reducers: {
        addItem: (state, action) => {
            const { itemInfo } = action.payload;
            const itemId = itemInfo.id;
            const itemIndex = state.items.findIndex((item) => item.itemInfo.id === itemId);

        // add payment of item's...
            state.payment += (itemInfo?.price || itemInfo?.defaultPrice) / 100;


            if(itemIndex !== -1) {
                state.items[itemIndex].itemCount++;
            } else {
                state.items.push({itemInfo, itemCount: 1});
            }
        },

        removeItem: (state, action) => {
            
            const { itemInfo } = action.payload;
            const itemId = itemInfo.id;
            const itemIndex = state.items.findIndex((item) => item.itemInfo.id === itemId);

        // remove payment of item's...
            state.payment -= (itemInfo?.price || itemInfo?.defaultPrice) / 100;

            
            if(itemIndex === -1) return ;

            if(state.items[itemIndex].itemCount > 1) {
                state.items[itemIndex].itemCount--;
            } 
            else {
                state.items = state.items.filter((item) => item.itemInfo.id !== itemInfo.id);
            }
        },

        clearItem: (state) => {
            state.payment = 0,
            state.items = [];
        }
    }
});

export const { addItem, removeItem, clearItem } = cartSlice.actions;
export default cartSlice.reducer;