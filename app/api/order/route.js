import { createOrder } from "@/controller/order";

export async function POST(req) {
  return createOrder(req);
}

