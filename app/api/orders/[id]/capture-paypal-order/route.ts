import { auth } from "@/lib/auth";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/lib/models/OrderModels";
import { paypal } from "@/lib/paypal";

export const POST = auth(async (...request: any) => {
  const [req, { params }] = request;  

  if (!req.auth) {
    return Response.json(
      {
        message: "unathorized",
      },
      { status: 401 }
    );
  }

  await dbConnect();

  // const payload = await req.json()
  // const { orderID } = payload;

  const order = await OrderModel.findById(params.id);

  if (order) {    
    try {
      const { orderID } = await req.json();
      
      const captureData = await paypal.capturePayment(orderID);
      console.log(captureData);
      
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: captureData.id,
        status: captureData.status,
        email_address: captureData.payer.email_address,
      };
      const updateOrder = await order.save();
      console.log(updateOrder);
      
      return Response.json(updateOrder);
    } catch (error: any) {
      return Response.json({ message: error.message }, { status: 500 });
    }
  } else {
    return Response.json({ message: "Oder not found" }, { status: 404 });
  }
}) as any ;
