import React, { useState, useEffect } from "react";
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import { connect, useDispatch } from "react-redux";
import { fetchProducts } from "../actions/productActions";

const Products = (props) => {
  const [productM, setProductM] = useState(null);
  const dispatch = useDispatch();

  const openModal = (product) => {
    setProductM(product)
  };

  const closeModal = () => {
    setProductM(null)
  };

  useEffect(() => {
    dispatch(fetchProducts());
    console.log('useEffect');
  }, []);

  return (
    <div>
      <Fade bottom cascade>
        {
          !props.products ? ( <div>Loading...</div> ) : (
            <ul className="products">
              {props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a href={"#" + product._id} onClick={() => openModal(product)}>
                      <img src={product.image} alt="product image"></img>
                      <p>{product.title}</p>
                    </a>
                    <div className="product-price">
                      <div>$ {product.price}</div>
                      <button
                        onClick={() => props.addToCart(product)}
                        className="button primary"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )
        }
      </Fade>
      {
         productM && <Modal isOpen={true} onRequestClose={closeModal}>
           <Zoom>
             <button className='close-modal' onClick={closeModal}>x</button>
             <div className='product-details'>
               <img src={productM.image} alt={productM.title}></img>
               <div className='product-details-description'>
                 <p>{productM.title}</p>
                 <p>{productM.description}</p>
                 <p>
                   Available sizes: {" "}
                   {productM.availableSizes.map(x => (
                     <span>{' '} <button className="button">{x}</button> </span>
                   ))}
                </p>
                <div className='product-price'>
                  <div>${productM.price}</div>
                  <button className='button primary' onClick={() => {
                    props.addToCart(productM)
                    closeModal();
                  }}>Add to Cart</button>
                </div>
               </div>
             </div>
           </Zoom>
         </Modal> 
      }
    </div>
  );
};

export default connect((state) => ({products: state.products.items}), {fetchProducts})(Products);