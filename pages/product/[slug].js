import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client } from '../../lib/client';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({ product, products , order }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }
  let ArrProduct = []
  let IdProduct = []
  let SoldOut=[]
  order?.map((item) =>(
    ArrProduct.push(IdProduct = item.productNumber)
  ))
  for(let i = 0 ; i<ArrProduct.length ;i++){
    if (ArrProduct[i].length > 36){
      IdProduct = ArrProduct[i].split(",")
      for(let j = 0 ; j<ArrProduct.length ;j++){
        SoldOut.push(IdProduct[j])
      }
    }
    else {
      SoldOut.push(ArrProduct[i])
    }
  }
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img src={image && image[index]} className="product-detail-image" />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img 
                key={i}
                src={item}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <h4>รายละเอียด </h4>
          <p>{details}</p>
          <p className="price">{price}&#3647;</p>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
          <div className="marquee">
            <div className="maylike-products-container track">
              {products.map((item) => (
                <Product key={item._id} product={item} order={SoldOut} />
              ))}
            </div>
          </div>
      </div>
    </div>
  )
}

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: { 
      slug: product.slug.current
    }
  }));

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps = async ({ params: { slug }}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]'
  
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  const orderQuery = '*[_type == "buyproduct"]'
  const order = await client.fetch(orderQuery);


  return {
    props: { products, product , order }
  }
}


export default ProductDetails