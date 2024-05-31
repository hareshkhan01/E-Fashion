import { createSlice } from '@reduxjs/toolkit'
const initialState = JSON.parse(localStorage.getItem('cart')) ?? [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart:(state, action) =>{
            console.log("Add to cart")
            state.push(action.payload)
        },
        deleteFromCart:(state, action)=> {
            console.log('Delete from cart')
            return state.filter(item => item.id !== action.payload.id);
        }
    }
})

export const { addToCart, deleteFromCart } = cartSlice.actions

export default cartSlice.reducer;