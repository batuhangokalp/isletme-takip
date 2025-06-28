import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

type Product = {
  id: number;
  name: string;
  type: string;
  size: string;
};

const dummyProducts: Product[] = [
  { id: 1, name: "Kilim A", type: "Kilim", size: "2x3" },
  { id: 2, name: "Yorgan B", type: "Yorgan", size: "150x200" },
  { id: 3, name: "Halı C", type: "Halı", size: "4x5" },
];

export default function RecordsList() {
  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Ürün Listesi</h1>
        <Link
          to="/products/add"
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Yeni Ürün Ekle
        </Link>
      </div>

      <div className="grid gap-4">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
              <p className="text-sm text-gray-600">
                Tip: {product.type} &nbsp;|&nbsp; Boyut: {product.size}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
                <FaEdit className="text-sm" />
                Düzenle
              </button>
              <button className="text-red-600 hover:text-red-800 transition flex items-center gap-1">
                <FaTrash className="text-sm" />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
