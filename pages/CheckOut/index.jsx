import React , { useRef , useState }from 'react'
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { useStateContext } from '../../context/StateContext';
import { urlFor , client } from '../../lib/client';
import emailjs from '@emailjs/browser';
import Link from 'next/link';





const CheckOut = ({orderdata}) => {
  const form = useRef();
  const { totalPrice,  cartItems,  toggleCartItemQuanitity } = useStateContext();
  let products = "";
  let IdProduct = [];
  let StrIdProduct = "";
  const numorder = orderdata.length +1
  const order = "orderที่ :" + numorder
  cartItems.map((item) =>(
    products =  products + `ชื่อสินค้า${item.name}ราคา${item.price}$จำนวน${item.quantity}ชิ้น`
  ))
  cartItems.map((item) =>(
    IdProduct.push(item._id)
  ))
  if (IdProduct.length>1){
    for(let i=0 ; i<IdProduct.length;i++){
      StrIdProduct = StrIdProduct + IdProduct[i] + ","
      if (i===IdProduct.length-1){
        StrIdProduct = StrIdProduct.slice(0, -1);
      }
    }
  }else{
    StrIdProduct = IdProduct[0]
  }
  const [values, setValues] = useState({
    name: order,
    product: products,
    price: totalPrice.toString(),
    namee: "namee",
    email: "email",
    phonenumber: "phonenumber",
    address: "address",
    productNumber: StrIdProduct,
  });
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    emailjs.sendForm("service_vdelpzh","template_gt12oka", form.current,"-FQ5DuKGH9jhs2k1V")
      .then((result) => {
          console.log("ส่งemailแล้ว");
      }, (error) => {
          console.log("ส่งemailไม่สำเร็จ");
      });
    console.log(values)
    fetch('/api/buyproduct', {
      method: 'POST',
      body: JSON.stringify(values),
    }).then(() => {
      window.location.href = '/ContactUs';
    }).catch((err) => {
      console.log(err)
    })
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
          <form className='form'  onSubmit={handleSubmit} ref={form}   >
            <input name="name"  type="hidden" value={order} id='_id' onChange={onChange} />
            <input name="productNumber" type="hidden" value={IdProduct} onChange={onChange} />
            <input name="price" type="hidden" value={totalPrice} id='price' onChange={onChange} />
            <input name="product" type="hidden" value={products} id='product' onChange={onChange}/>
              <div className='form-container'>
                <input  name="namee" placeholder="name" type="text" id='from_name' onChange={onChange}/>
              </div>
              <div className='form-container'>
                <input name="email" placeholder="email" type="email" id='email' onChange={onChange} />
              </div>
              <div className='form-container'>
                <input name="phonenumber" placeholder="Phone" type="text" id='phonenum' onChange={onChange} />
              </div>
              <div className='form-container'>
                <textarea name="address" placeholder="address" id='address' onChange={onChange} />
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