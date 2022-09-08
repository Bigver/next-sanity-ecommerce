import React , { useRef }from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
import { urlFor , client } from '../../lib/client';
import emailjs from '@emailjs/browser';
import Link from 'next/link';

interface IFormInput {
  name: string;
  product: string;
  price: string;
  namee: string;
  email: string;
  phonenumber: string;
  address: string;
  productNumber: any;
}



const CheckOut = ({orderdata}) => {
  const form = useRef();
  const { totalPrice,  cartItems,  toggleCartItemQuanitity } = useStateContext();
  const { register, handleSubmit,  formState: { errors } } = useForm<IFormInput>();
  let products = "";
  let IdProduct = [];
  const numorder = orderdata.length +1
  const order = "orderที่ :" + numorder
  cartItems.map((item) =>(
    products =  products + `ชื่อสินค้า${item.name}ราคา${item.price}$จำนวน${item.quantity}ชิ้น`
  ))
  cartItems.map((item) =>(
    IdProduct.push(item._id)
  ))

  

  const onSubmit: SubmitHandler<IFormInput> = async (data,e) =>{
    e.preventDefault();
    emailjs.sendForm("service_vdelpzh","template_gt12oka", form.current,"-FQ5DuKGH9jhs2k1V")
      .then((result) => {
          console.log("ส่งemailแล้ว");
      }, (error) => {
          console.log("ส่งemailไม่สำเร็จ");
      });
    fetch('/api/buyproduct', {
      method: 'POST',
      body: JSON.stringify(data),

    }).then(() => {
      window.location.href = '/ContactUs';
    }).catch((err) => {
      console.log(err)
    })
  };

  return (

    <div className='container-checkout'>
      <div className='container-form' >
        <div className='container-info' >
              <div className="product-container">
              {cartItems.length >= 1 && cartItems.map((item) => (
                <div className="product" key={item._id}>
                  <img   className="cart-product-image" src={item?.image[0]} />
                  <div className="item-desc1">
                    <div className="flex1 top">
                      <h5>{item.name}</h5>
                      <h4>{item.price}&#3647;</h4>
                    </div>
                  </div>
                </div>
              ))}
              <div className='total'>
                <h1>ราคารวม {totalPrice}&#3647;</h1>
              </div>          
          </div>
        </div>
        <div className='container-formsub' >
          <span>สั่งซื้อสินค้า</span>
          <form className='form'  onSubmit={handleSubmit(onSubmit)} ref={form}   >
            <input {...register("name",{required :true})}  type="hidden" value={order} id='_id' />
            <input {...register("productNumber",{required :true})}  type="hidden" value={IdProduct} />
            <input {...register("price",{required :true})}  type="hidden" value={totalPrice} id='price' />
            <input {...register("product",{required :true})}  type="hidden" value={products} id='product'/>
            <input {...register("product",{required :true})}  type="hidden" value={products} id='product'/>
              <div className='form-container'>
                <input {...register("namee",{required :true})} placeholder="name" type="text" id='from_name'/>
              </div>
              <div className='form-container'>
                <input {...register("email",{required :true})} placeholder="email" type="email" id='email' />
              </div>
              <div className='form-container'>
                <input {...register("phonenumber",{required :true})} placeholder="Phone" type="text" id='phonenum' />
              </div>
              <div className='form-container'>
                <textarea {...register("address",{required :true})} placeholder="address" id='address'/>
              </div>  
              
              <div className='form-submit'>
                  <input type="submit" value="send"  />
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const order = '*[_type == "buyproduct"]';
  const orderdata = await client.fetch(order);
  return {
    props: { orderdata }
  }
}


export default CheckOut


// service_vdelpzh