import React from 'react'
import { Product, FooterBanner, HeroBanner } from '../components';
import Show from '../components/Show';
import { client } from '../lib/client';

const Home = ({ products, bannerData , order}) => {
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
      <Show bannerData={bannerData} key={bannerData._id}/>
      <div className="products-container">
        {products?.map((product) => <Product key={product._id} product={product} order={SoldOut} />)}
      </div>
    </div>
  )
}
export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  const orderQuery = '*[_type == "buyproduct"]'
  const order = await client.fetch(orderQuery);


  return {
    props: { products, bannerData ,order }
  }
}

export default Home
