import type { NextApiRequest, NextApiResponse } from "next"
import sanityClient from '@sanity/client';

interface MulterRequest extends Request {
    file: any;
}

const client = sanityClient({
    projectId: '2rca07ul',
    dataset: 'production',
    apiVersion: '2022-08-13',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
    ignoreBrowserTokenWarning: true
  });




export default async function buyproduct(
    req: NextApiRequest, res: NextApiResponse): Promise<any>{
    const {name,product,price,namee,email,phonenumber,address,productNumber} = JSON.parse(req.body);
    try {
        await client.create({
            _type: 'buyproduct',
            name,
            product,
            price,
            namee,
            email,
            phonenumber,
            address,
            productNumber
           
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'ส่งไม่สำเร็จ' , err});
    }

    console.log("ส่งสำเร็จ")
    res.status(200).json({ name: 'Submit' })
  }
  