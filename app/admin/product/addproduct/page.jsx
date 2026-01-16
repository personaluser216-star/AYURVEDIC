"use client";
import React, { useState } from "react";
import Link from "next/link";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null, null]);
  const [variants, setVariants] = useState([
    { weight: "", unit: "", price: "" },
  ]);
  const [loading, setLoading] = useState(false);

  const addVariant = () => {
    setVariants([...variants, { weight: "", unit: "kg", price: "" }]);
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleSubmit = async () => {
    if (!name || !description) {
      alert("Name & Description required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    images.forEach((img) => {
      if (img) formData.append("images", img);
    });

   const formattedVariants = variants.map((v) => ({
  weight: Number(v.weight),
  unit: v.unit,        // ✅ unit add
  price: Number(v.price),
}));

formData.append("variants", JSON.stringify(formattedVariants));


    try {
      setLoading(true);

      const res = await fetch("/api/product", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Product added successfully");
        setName("");
        setDescription("");
        setImages([null, null, null, null]);
        setVariants([{ weight: "", unit: "kg", price: "" }]);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div>
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <p className="font-semibold text-xl">Add Products</p>
      <nav className="text-sm text-gray-500">
        <Link href="/admin">Home</Link> / Add Products
      </nav>
    </div>

    <div className="bg-white p-6 rounded shadow-sm">
      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* ================= LEFT COLUMN ================= */}
        <div>
          {/* Name */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Product Name</p>
            <input
              className="border p-2 rounded w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="mb-1 font-medium">Description</p>
            <textarea
              className="border p-2 rounded w-full"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Images */}
          <div>
            <p className="mb-2 font-medium">Images</p>
            <div className="flex gap-4 flex-wrap">
              {images.map((img, index) => (
                <label
                  key={index}
                  className="w-24 h-24 border-2 border-dashed rounded flex items-center justify-center cursor-pointer"
                >
                  {img ? (
                    <img
                      src={URL.createObjectURL(img)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-gray-400">Upload</span>
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const updated = [...images];
                      updated[index] = e.target.files[0];
                      setImages(updated);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div>
          <p className="mb-2 font-medium">Weight / Size & Price</p>

          {variants.map((v, i) => (
            <div
              key={i}
              className="border rounded p-3 mb-3 flex items-center gap-3"
            >
              <input
                type="number"
                placeholder="Weight"
                className="border p-2 rounded w-24"
                value={v.weight}
                onChange={(e) =>
                  handleVariantChange(i, "weight", e.target.value)
                }
              />

              <select
                className="border p-2 rounded"
                value={v.unit}
                onChange={(e) =>
                  handleVariantChange(i, "unit", e.target.value)
                }
              >
                <option value="kg">Kg</option>
                <option value="gram">Gram</option>
                 <option value="ltr">ltr</option>
                 <option value="tbl">Tablet</option>
                <option value="ml">ml</option>

                 

              </select>

              <input
                type="number"
                placeholder="Price"
                className="border p-2 rounded flex-1 text-right"
                value={v.price}
                onChange={(e) =>
                  handleVariantChange(i, "price", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addVariant}
            className="text-blue-600 text-sm"
          >
            + Add More Variant
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white mt-6 px-6 py-2 rounded"
      >
        {loading ? "Adding..." : "Add Product"}
      </button>
    </div>
  </div>
);

};

export default AddProduct;
