import React from 'react';
import {Link} from 'react-router-dom'
import { useCart } from '../hooks/useCart';
function Header(props) {

  const {totalPrice} = useCart()

   return (
   <header className="d-flex justify-between align-center">
   <Link to="/">
   <div className = "d-flex align-center">
   <img width={40} height={40} src= "/img/image 4.png"/>
       <div >
         <h3 className="text-uppercase"> React Sneackers</h3>
         <p className="opacity-5">Store for the best sneakers</p>
       </div>
   </div>
   </Link>
       <ul className="d-flex">
         <li  onClick ={props.onClickCart} className="mr-25 cu-p">
          <img width={18} height={12.27} src="img/carrt.svg"/>
            <span> {totalPrice} rub.</span></li>
         <li  className=" cu-p"  >
           <Link to="/favorites">
           < img width={19} height={13} src="img/like.svg"/>
           </Link>
           <Link to="/orders">
           < img width={20} height={15} src="img/orders.svg"/>
           </Link>
            </li>
       </ul>
   </header>
   ); 
}

export default Header;