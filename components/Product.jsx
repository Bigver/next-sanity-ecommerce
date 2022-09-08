import React from 'react';
import Link from 'next/link';
import { urlFor } from '../lib/client';

const Product = ({ product: { image, name, slug, price, _id }, order }) => {
  var tagProduct
  const Products =  "(ขายแล้ว)"
  order?.map((id) => {id===_id ? tagProduct=Products:  null})

  return (
    <div>
       <Link href={`/product/${slug.current}`}>
          <div className="product-card">
            <img 
              src={image && image[0]}
              width={250}
              height={250}
              className="product-image"
            />
            
            <p className="product-name">{name} {tagProduct ? 
            <span className='sold-out'>{Products}</span> : null
            }</p>
            <p className="product-price">{price}&#3647;</p>
          </div>
        </Link>
    </div>
  )
}

export default Product