import AppContext from "../context"
import React from "react"

export const useCart = () => {
    const {cartItems, setCartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((acc, obj) => Number(acc) + Number(obj.price), 0)
    
    return {cartItems, setCartItems, totalPrice}
}

