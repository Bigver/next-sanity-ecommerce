import React from 'react'

const Show = ({bannerData}) => {
  return (
    <div className='container-show' >
        <div className='text'>
          <h1>SHOP I-PHONE</h1>
        </div>
        <div className='container-img' >
            <img src={bannerData[0].image1} alt="" />
        </div>
    </div>
  )
}

export default Show