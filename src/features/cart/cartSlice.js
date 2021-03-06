import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
// import cartItems from "../../cartItems";


const url = 'https://course-api.com/react-useReducer-cart-project';
export const getCartItems = createAsyncThunk('cart/getCartItems',()=>{
    return fetch(url)
    .then((resp)=>resp.json())
    .catch((err)=>console.log(err))
})

const initialState = {
    cartItems:[],
    amount:4,
    total:0,
    isLoading:true
}

const cartSlice = createSlice({
    name:'cart',
    initialState,
    extraReducers:{
            [getCartItems.pending]:(state)=>{
                state.isLoading = true;
            },
            [getCartItems.fulfilled]:(state,action)=>{
                console.log(action);
                state.cartItems = action.payload
                state.isLoading = false
            },
            [getCartItems.rejected]: (state)=>{
                state.isLoading = false
            }
        },
    reducers:{
        clearCart:(state)=>{
            state.cartItems=[]
        },
        removeItem: (state,action)=>{
            const itemId = action.payload;
            console.log(itemId);
            state.cartItems = state.cartItems.filter((item)=>
                itemId!==item.id
            )
        },
        increase: (state,action)=>{
           const itemId = action.payload;
           state.cartItems = state.cartItems.map((item)=>{
               if(itemId===item.id){
                   console.log(item.amount)
                   item.amount+=1
               }
               return item
           })
        },
        decrease: (state,action)=>{
            const itemId = action.payload;
            state.cartItems = state.cartItems.map((item)=>{
                if(itemId===item.id){
                    item.amount-=1
                }
                return item
            })
         },
         getTotals:  (state,action)=>{
             let total =0;
             let amount = 0;
            state.cartItems.forEach((item)=>{
                total+=item.price * item.amount
                amount += item.amount
                total = parseFloat(total.toFixed(2));
            })
            state.amount = amount;
            state.total=total
        }
         
    }
})

console.log(cartSlice);
export const {clearCart,removeItem,
increase,decrease,getTotals} = cartSlice.actions
export default cartSlice.reducer