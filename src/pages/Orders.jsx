import React from 'react';
import Card from "../components/Card"
import axios from 'axios';
import AppContext from '../context';


function Orders () {
    const {onAddToCart, onAddToFavorites} = React.useContext(AppContext)
    const [orders, setOrders] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
       (async () => {
        try {
            const {data} = await axios.get('https://634ae3ab33bb42dca40d3ee0.mockapi.io/orders')
            setOrders(data.map(it => it.items).flat())
            setIsLoading(false)
        } catch (error) {
            alert('Error in order request')
            console.log(error)
        }
       })() 
    })
    
    return (
        <div className=" content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1 >My orders</h1>
        
        </div>
       <div className="d-flex flex-wrap">
       {(isLoading ? [...Array(8)] : orders).map((item, index) => (
             <Card
             key={index} 
             loading = {isLoading}
             {...item}
             />
            ))}
            </div>
         </div>
    )
}
export default Orders;