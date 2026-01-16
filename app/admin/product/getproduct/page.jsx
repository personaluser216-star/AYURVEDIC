"use client";

import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

const getproduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
      );
      const result = await res.json();
      setProducts(result.data || []);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Delete product
  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`,
        { method: "DELETE" }
      );
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // 🔹 DataGrid columns
  const columns = [
    {
  field: "image",
  headerName: "Image",
  width: 100,
  renderCell: (params) => (
    <img src={params.value} className="w-12 h-12 object-cover rounded" />
  ),
}
,
    {
      field: "name",
      headerName: "Product Name",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => (
        <span className=" font-semibold">
          ₹{params.value}
        </span>
      ),
    },
    {
      field: "weight",
      headerName: "Weight",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() =>
              router.push(`/admin/product/editproduct/${params.row.id}`)
            }
          >
            <FaEdit />
          </IconButton>

          <IconButton
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <FaTrash />
          </IconButton>
        </>
      ),
    },
  ];

  // 🔹 Rows mapping
  const rows = products.map((product) => ({
    id: product._id,
    name: product.name,
    image: product.images?.[0] || "/placeholder.png", 
    price: product.variants?.[0]?.price,
    weight: `${product.variants?.[0]?.weight} ${product.variants?.[0]?.unit}`,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">All Products</h1>

      <div className="bg-white rounded-lg shadow" style={{ height: 500 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 },
            },
          }}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};

export default getproduct;
