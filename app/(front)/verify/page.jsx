"use client";
export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { clearShoppingCart } from "@/utils/shoppingcart";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get("orderId");
      const success = searchParams.get("success");

      if (!orderId) {
        router.push("/");
        return;
      }

      try {
        await fetch("/api/order/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId, success }),
        });

        if (success === "true") clearShoppingCart();
        router.push("/");
      } catch (err) {
        console.error("Verify API error:", err);
        router.push("/");
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return <p className="text-center mt-20">Verifying payment...</p>;
}
