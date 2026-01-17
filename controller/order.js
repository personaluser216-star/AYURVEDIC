import { NextResponse } from "next/server";

import Order from "@/models/order"
import { connectDB } from "@/lib/mongodb";
import order from "@/models/order";

export const createOrder = async (req) => {
  try {
    await connectDB();

    const body = await req.json();
    const {
      customer,
      items,
      totalAmount,
      paymentMethod,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items in order" },
        { status: 400 }
      );
    }

    // ❌ ONLINE ORDER DIRECT CREATE NAHI
    if (paymentMethod === "online") {
      return NextResponse.json(
        { error: "Online payment requires verification" },
        { status: 400 }
      );
    }

    // ✅ COD ORDER CREATE
    const order = await Order.create({
      customer,
      items,
      totalAmount,
      paymentMethod: "cod",
      paymentStatus: "pending",
    });

    return NextResponse.json(
      { success: true, order },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create Order Error:", error);
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
};
export const getOrder = async()=> {
  try {
    await connectDB();

   

    const products = await order.find();
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to get products" },
      { status: 500 }
    );
  }
};
