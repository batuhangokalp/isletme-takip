import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import ConfirmDeleteModal from "../../components/Common/Modals/ConfirmDeleteModal";
import EditProductModal from "../../components/Common/Modals/EditProductModal";

type ProductType = "Halı" | "Kilim" | "Yorgan" | "Diğer";

type Product = {
  _id: string;
  name: string;
  type: ProductType;
  width: number | "";
  height: number | "";
  color: string;
  description: string;
  pricePerSquareMeter: number | "";
};

const emptyProduct: Product = {
  _id: "",
  name: "",
  type: "Halı",
  width: "",
  height: "",
  color: "",
  description: "",
  pricePerSquareMeter: "",
};

export default function RecordsList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [area, setArea] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Veriler alınamadı:", err);
        alert("Ürünler yüklenemedi.");
      }
    };
    fetchProducts();
  }, []);

  // Alan ve toplam fiyatı hesapla seçili ürün değişince
  useEffect(() => {
    if (
      selectedProduct &&
      typeof selectedProduct.width === "number" &&
      selectedProduct.width > 0 &&
      typeof selectedProduct.height === "number" &&
      selectedProduct.height > 0
    ) {
      const calculatedArea =
        (selectedProduct.width / 100) * (selectedProduct.height / 100);
      setArea(calculatedArea);

      if (
        typeof selectedProduct.pricePerSquareMeter === "number" &&
        selectedProduct.pricePerSquareMeter > 0
      ) {
        setTotalPrice(calculatedArea * selectedProduct.pricePerSquareMeter);
      } else {
        setTotalPrice(0);
      }
    } else {
      setArea(0);
      setTotalPrice(0);
    }
  }, [
    selectedProduct?.width,
    selectedProduct?.height,
    selectedProduct?.pricePerSquareMeter,
  ]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!selectedProduct?.name.trim()) newErrors.name = "Ürün adı gerekli";
    if (selectedProduct?.width === "" || selectedProduct?.width! <= 0)
      newErrors.width = "Geçerli bir genişlik girin";
    if (selectedProduct?.height === "" || selectedProduct?.height! <= 0)
      newErrors.height = "Geçerli bir yükseklik girin";
    if (
      selectedProduct?.pricePerSquareMeter === "" ||
      selectedProduct?.pricePerSquareMeter! <= 0
    )
      newErrors.pricePerSquareMeter = "Metrekare fiyatı gerekli";
    return newErrors;
  };

  const openAddModal = () => {
    setSelectedProduct(emptyProduct);
    setErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    if (!selectedProduct) return;

    setSelectedProduct((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "width" ||
              name === "height" ||
              name === "pricePerSquareMeter"
                ? value === ""
                  ? ""
                  : Number(value)
                : value,
          }
        : prev
    );
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      if (!selectedProduct) return;

      if (selectedProduct?._id) {
        // Güncelleme (PUT)
        const res = await axios.put(
          `${process.env.REACT_APP_API_URL}products/${selectedProduct._id}`,
          selectedProduct
        );
        setProducts((prev) =>
          prev.map((p) => (p._id === selectedProduct._id ? res.data : p))
        );
        alert("Ürün başarıyla güncellendi.");
      } else {
        const { _id, ...productToSend } = selectedProduct;

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}products`,
          productToSend
        );
        setProducts((prev) => [...prev, res.data]);
        alert("Ürün başarıyla eklendi.");
      }

      closeModal();
    } catch (error: any) {
      console.error("Kayıt hatası:", error);
      alert(
        "Kayıt başarısız: " + (error.response?.data?.error || error.message)
      );
    }
  };

  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}products/${productToDelete._id}`
      );
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err: any) {
      console.error("Silme hatası:", err);
      alert("Ürün silinemedi: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-2xl shadow-xl max-w-5xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Ürün Listesi</h1>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Yeni Ürün Ekle
        </button>
      </div>

      <div className="grid gap-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="flex justify-between items-center bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
          >
            <div>
              <h2 className="text-lg font-bold text-gray-800">
                {product.name}
              </h2>
              <p className="text-sm text-gray-600">
                Tip: {product.type} &nbsp;|&nbsp; Boyut: {product.width}x
                {product.height} cm
              </p>
            </div>
            <div className="flex gap-3">
              <button
                className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                onClick={() => openEditModal(product)}
              >
                <FaEdit className="text-sm" />
                Düzenle
              </button>
              <button
                onClick={() => {
                  setProductToDelete(product);
                  setDeleteModalOpen(true);
                }}
                className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
              >
                <FaTrash className="text-sm" />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct}
        onChange={handleChange}
        onSave={handleSave}
        area={area}
        totalPrice={totalPrice}
        errors={errors}
      />
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        itemName={productToDelete?.name}
      />
    </div>
  );
}
