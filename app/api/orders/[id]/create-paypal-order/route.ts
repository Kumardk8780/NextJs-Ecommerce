import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModels";
import { paypal } from "@/lib/paypal";

export const POST = auth(async (...request: any) => {
  const [req, { params }] = request;
  if (!req.auth) {
    return Response.json(
      {
        message: "unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  await dbConnect();

  const order = await OrderModel.findById(params.id);

  if (order) {
    console.log("We are in the create paypal order : Id:",params.id);
    console.log("order:",order);
    
    try {
      const paypalOrder = await paypal.createOrder(order.totalPrice);
      console.log("Paypal Order:",paypalOrder);
      
      return Response.json(paypalOrder);
    } catch (error: any) {
      return Response.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  } else {
    return Response.json(
      {
        message: "Order not found",
      },
      { status: 404 }
    );
  }
});
