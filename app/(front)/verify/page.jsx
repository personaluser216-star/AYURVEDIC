"use client";

import { clearShoppingCart } from "@/utils/shoppingcart";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("orderId");
      const success = searchParams.get("success");

      if (!orderId) return;

      await fetch("/api/order/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, success }),
      });

      if (success === "true") {
        clearShoppingCart();
        router.push("/");
      } else {
        router.push("/");
      }
    };

    verifyPayment();
  }, []);

  return <p className="text-center mt-20">Verifying payment...</p>;
}
