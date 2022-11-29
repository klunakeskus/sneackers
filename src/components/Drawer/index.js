import axios from 'axios';
import React from 'react';
import Info from '../Info';
import { useCart } from '../../hooks/useCart';
import styles from './Drawer.module.scss'

const delay = (ms) => new Promise((resolve) => 
  setTimeout(resolve, ms)
)


function Drawer({onClose,  onRemove, items =[], opened}) {
 const {cartItems, setCartItems, totalPrice} = useCart()
 const [orderId, setOrderId] = React.useState(null)
 const [isOrderComplete, setIsOrderComplete] = React.useState(false)
 const [isLoading, setIsLoading] = React.useState(true)  

 

  const onClickOrder = async () => {
   try {
    setIsLoading(true)
    const {data} = await axios.post('https://634ae3ab33bb42dca40d3ee0.mockapi.io/orders', 
    {items: cartItems})
    // await axios.put('https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart',[])
    setOrderId(data.id)
    setIsOrderComplete(true)
    setCartItems([])

   for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    await axios.delete('https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart' + item.id)
    await delay(1000)
   }
   } catch (error) {
    // alert ('Something goes wrong')
   }
   setIsLoading(false)
  }

  return ( 
     <div  className={`${styles.overlay} ${opened ? styles.overlayVisible :''}`}>
        <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30  ">Shopping cart
        <img  onClick={onClose} className="removeBtn" src="/img/btnRemove.svg" alt="Close"/>
        </h2>

        {
          items.length > 0 ? (
            <div className="d-flex flex-column flex" >
              <div className="items flex">
               {items.map((obj) => (
               <div key={obj.id} className="cartItem d-flex align-center mb-20 ">
                  <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg "></div>
              
                    <div className="mr-20 flex">
                    <p className="mb-5"> {obj.title} </p>
                    <b> {obj.price} </b>
                    </div>
                  <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btnRemove.svg" alt="Remove"/>
                  </div>
                  ))}
                </div>
                
              <div className="cartTotalBlock">
              <ul> 
                <li >
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} rub.</b>
                </li>
                <li >
                <span>Taxe 5%</span>
                <div></div>
                <b>{(totalPrice / 100)*5} rub.</b>
                </li>
              </ul>
              <button  onClick={onClickOrder} className="greenButton">
                Place an order
                <img src="/img/arrow.svg" alt="Arrow"/>
                </button>
              </div>
              </div>
          ) : (
            <Info 
            title= {isOrderComplete ? "Order successfully placed!" : "Shopping cart is empty" }
            description={isOrderComplete ? `Your order #${orderId} has been forwarded to the delivery service ` : "Add a product to place an order" }
            image={isOrderComplete ? "/img/itsDone.jpg":"/img/empty-cart.jpg" }/>
          )} 
          </div>
         </div>        
     );

 }
 export default Drawer;