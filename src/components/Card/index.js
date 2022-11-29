import React from 'react'; 
import styles from './Card.module.scss'
import ContentLoader from "react-content-loader"
import AppContext from '../../context';


function Card({
  id,
   onPlus,
    onFavorite,
     title,
      imageUrl,
       price,
        favorited = false,
          loading = false}) {
  const {isItemAdded} = React.useContext(AppContext)
  const [isFavorite, setisFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price}         
  // console.log(title, isItemAdded(id))
   
  const onClickPlus = () => {
      onPlus(obj);
    };

 
    const onClickFavorite = () => {
      onFavorite({id, title, imageUrl, price});
      setisFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
          {
            loading ? (<ContentLoader 
            speed={2}
            width={150}
            height={265}
            viewBox="0 0 150 265"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
     
          >
            <rect x="0" y="0" rx="10" ry="10" width="150" height="91" /> 
            <rect x="0" y="109" rx="7" ry="7" width="150" height="15" /> 
            <rect x="0" y="133" rx="7" ry="7" width="93" height="15" /> 
            <rect x="0" y="181" rx="8" ry="8" width="80" height="24" /> 
            <rect x="115" y="173" rx="9" ry="9" width="32" height="32" />
          </ContentLoader> ): <>
          <div className={styles.favorite} onClick = {onClickFavorite}>
        <img src ={isFavorite ? "/img/Liked.svg" : "/img/unliked.svg"}   alt="Unliked"/>
        </div>
        <img width={133} height={112} src={imageUrl}  alt="Tapki"/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column ">
            <span>Price:</span>
            <b>{price}</b>
          </div>
          { 
          onPlus && <img className={styles.plus}
          onClick = {onClickPlus}
          src={isItemAdded(id) ? "/img/btnChecked.svg" : "/img/btn-plus.svg"} alt="Plus"/>
          }
        </div></>
          }
        
      </div>
    ); 
}
export default Card;