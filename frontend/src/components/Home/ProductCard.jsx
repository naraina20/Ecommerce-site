import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';



const ProductCard = ({ product }) => {
    
    const options = {
        edit: false,
        color: "rgba(20,20,20,0,1)",
        activeColor: "tomato",
        
        size: window.innerWidth < 600 ? 15 : 20,
        value: product.ratings,
        isHalf: true,
    };

  return (
      <Link className='productCard' to={`/product/${product._id}`}>
          <img src={product.images === []? "No images": product.images[0].url} alt={product.name} loading="lazy"/>
          <p>{product.name}</p>
          <div>
              <ReactStars {...options} /> {" "}
              <span>({product.numOfReviews} Reviews)</span>
          </div>
          <span>{`₹${product.price}`}</span>
      </Link>   
  )
}

export default ProductCard