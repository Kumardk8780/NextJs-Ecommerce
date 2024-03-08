import data from '@/lib/data'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'
import UserModel from '@/lib/models/UserModel'
import { NextRequest, NextResponse } from 'next/server'

// console.log(data.products);


export const GET = async (request: NextRequest) => {

  const { users,item } = data

  await dbConnect();

  await UserModel.deleteMany()
  await UserModel.insertMany(users)
  console.log('Seeded successfully', users);
  
  await ProductModel.deleteMany()
  await ProductModel.insertMany(item)
    console.log('Seeded successfully', item);

  

  return NextResponse.json({
    message: 'seeded successfully',
    // result: products,
    users,
    item,
  })
}