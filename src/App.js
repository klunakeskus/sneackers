import React from 'react';
import axios from 'axios';
import {Route, Routes} from 'react-router-dom'

import Drawer from './components/Drawer';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

import AppContext from './context';




function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true)
  
  React.useEffect(()=> {
  async function fetchData(){
 
  try {
        const cartResponse =  await axios.get('https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart')
        const favoritesResponse =  await axios.get('https://634ae3ab33bb42dca40d3ee0.mockapi.io/favorites')  
        const itemsResponse =  await axios.get('https://634ae3ab33bb42dca40d3ee0.mockapi.io/items') 

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
  } catch (error) {
   alert('Error with data request') 
  }
}
fetchData()
  },[])

 

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if(findItem) {
        setCartItems((prev) => prev.filter((item )=> Number(item.parentId) !== Number(obj.id))) 
        await axios.delete(`https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart/${findItem}`)
      } 
      else {
        setCartItems((prev) => [...prev, obj])
        const {data} = await axios.post('https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(it =>
          {
            if(it.parentId === obj.parentId){
              return {
                ...it,
                id: data.id
              }
            }
            return it
          }))
      }
    } catch (error) {
      alert('u vas prikipel shtyr')
    }
  }
  

  const onAddToFavorites = async (obj) => {
   try {
    if(favorites.find(fobj => Number(fobj.id) === Number(obj.id))){
      axios.delete(`https://634ae3ab33bb42dca40d3ee0.mockapi.io/favorites/${obj.id}`)
       setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
    } else {
     const {data} = await axios.post('https://634ae3ab33bb42dca40d3ee0.mockapi.io/favorites', obj)
      setFavorites((prev) => [...prev, data])
    }
   } catch (error) {
    alert('Something goes wrong')
   }
    }
  
    const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id) )
  }

  const onRemoveItem = (id) => {
     axios.delete(`https://634ae3ab33bb42dca40d3ee0.mockapi.io/cart/${id}`)
     setCartItems((prev) => prev.filter((item) => item.id !== id)) 
   
  }

  return (
    <AppContext.Provider value={{
      items,
     cartItems,
      favorites,
       isItemAdded,
       onAddToFavorites, 
       setCartOpened,
       onAddToCart,
       setCartItems
       }}>
      <div className="wrapper clear">
      <div>
      <Drawer items={cartItems} onClose = {() => setCartOpened(false)} onRemove = {onRemoveItem} opened={cartOpened}/>
      </div>
       <Header onClickCart ={()=> setCartOpened(true)} />
        <Routes>   
          <Route path='/' element = { <Home items = {items}
                                    
                                    cartItems = {cartItems}  
                                     searchValue = {searchValue} 
                                     setSearchValue = {setSearchValue} 
                                     onChangeSearchInput = {onChangeSearchInput}
                                     onAddToFavorites = {onAddToFavorites} 
                                     onAddToCart = {onAddToCart}
                                     isLoading =  {isLoading} />}/>
                                     
          <Route path='/favorites' element = { < Favorites />}/>
          <Route path='/orders' element = { < Orders />}/>
       </Routes>
    
    </div>
    </AppContext.Provider>
  );
}

export default App;
