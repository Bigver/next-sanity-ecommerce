export default {
    name: 'buyproduct',
    title: 'Order',
    type: 'document',
    fields: [
      { 
        name: 'name',
        title: 'หมายเลข Order',
        type: 'string',
      },
      { 
        name: 'product',
        title: 'รายระเอียดสินค้า',
        type: 'string',
      },
      { 
        name: 'price',
        title: 'ราคาทั้งหมด',
        type: 'string',
      },
      { 
        name: 'namee',
        title: 'ชื่อ',
        type: 'string',
      },
      { 
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      { 
        name: 'address',
        title: 'ที่อยู่',
        type: 'string',
      },
      { 
        name: 'phonenumber',
        title: 'เบอร์โทร',
        type: 'string',
      },
      { 
        name: 'productNumber',
        title: 'เลขสินค้า',
        type: 'string'
      }
    ]
  }