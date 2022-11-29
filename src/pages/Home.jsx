import React from 'react';
import Card from '../components/Card';


function Home ({items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddToFavorites,
    onAddToCart,
    isLoading
}) { 
   
    
    const renderItems = () => {
        return (isLoading ? [...Array(8)] : items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase())))
         .map((item, index) => (
            <Card
            key={index} 
            onPlus = {(obj) => onAddToCart(obj)}
            onFavorite = {(obj) => onAddToFavorites(obj)}
           loading = {isLoading}
            {...item}
               />
           ))
    }
    return (
        <div className=" content p-40">
        <div className="d-flex align-center justify-between mb-40">
        <h1 >{searchValue ? `Search for: ${searchValue}`: 'All Sneackers'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt ="Search"/>
          {searchValue && (<img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/btnRemove.svg" alt="Clear"/>)}
          <input onChange ={onChangeSearchInput} value={searchValue} placeholder="Search..."/>
        </div>
        </div>
       <div className="d-flex flex-wrap">
            {renderItems()}
            </div>
         </div>
    )
}
export default Home;