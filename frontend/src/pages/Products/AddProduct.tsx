import React, { useState, useEffect } from "react";

type ProductType = "Halı" | "Kilim" | "Yorgan" | "Diğer";

type Product = {
  name: string;
  type: ProductType;
  width: number | "";
  height: number | "";
  color: string;
  description: string;
  pricePerSquareMeter: number | "";
};

const initialProduct: Product = {
  name: "",
  type: "Halı",
  width: "",
  height: "",
  color: "",
  description: "",
  pricePerSquareMeter: "",
};

const AddProductForm = () => {
  const [product, setProduct] = useState<Product>(initialProduct);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [area, setArea] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // En ve boy varsa alanı hesapla (cm -> m² dönüştür)
    if (
      typeof product.width === "number" &&
      product.width > 0 &&
      typeof product.height === "number" &&
      product.height > 0
    ) {
      const calculatedArea = (product.width / 100) * (product.height / 100);
      setArea(calculatedArea);

      // Toplam fiyat = metrekare * metrekare fiyatı
      if (
        typeof product.pricePerSquareMeter === "number" &&
        product.pricePerSquareMeter > 0
      ) {
        setTotalPrice(calculatedArea * product.pricePerSquareMeter);
      } else {
        setTotalPrice(0);
      }
    } else {
      setArea(0);
      setTotalPrice(0);
    }
  }, [product.width, product.height, product.pricePerSquareMeter]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!product.name.trim()) newErrors.name = "Ürün adı gerekli";
    if (product.width === "" || product.width <= 0)
      newErrors.width = "Geçerli bir genişlik girin";
    if (product.height === "" || product.height <= 0)
      newErrors.height = "Geçerli bir yükseklik girin";
    if (
      product.pricePerSquareMeter === "" ||
      product.pricePerSquareMeter <= 0
    )
      newErrors.pricePerSquareMeter = "Metrekare fiyatı gerekli";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]:
        name === "width" ||
        name === "height" ||
        name === "pricePerSquareMeter"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    alert(
      "Ürün kaydedildi:\n" +
        JSON.stringify(
          { ...product, area: area.toFixed(2), totalPrice: totalPrice.toFixed(2) },
          null,
          2
        )
    );
    setProduct(initialProduct);
    setArea(0);
    setTotalPrice(0);
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Ürün Ekle
      </h2>
      <form onSubmit={handleSubmit} noValidate>
        {/* Ürün Adı */}
        <label className="block mb-1 font-semibold text-gray-700" htmlFor="name">
          Ürün Adı *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={product.name}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.name
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Ürün adını girin"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

        {/* Ürün Türü */}
        <label
          className="block mt-4 mb-1 font-semibold text-gray-700"
          htmlFor="type"
        >
          Ürün Türü
        </label>
        <select
          id="type"
          name="type"
          value={product.type}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Halı</option>
          <option>Kilim</option>
          <option>Yorgan</option>
          <option>Diğer</option>
        </select>

        {/* Ölçüler */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="width"
            >
              Genişlik (cm) *
            </label>
            <input
              id="width"
              name="width"
              type="number"
              min={0}
              value={product.width}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition ${
                errors.width
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Genişlik"
            />
            {errors.width && (
              <p className="text-red-500 text-sm mt-1">{errors.width}</p>
            )}
          </div>
          <div className="flex-1">
            <label
              className="block mb-1 font-semibold text-gray-700"
              htmlFor="height"
            >
              Yükseklik (cm) *
            </label>
            <input
              id="height"
              name="height"
              type="number"
              min={0}
              value={product.height}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition ${
                errors.height
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Yükseklik"
            />
            {errors.height && (
              <p className="text-red-500 text-sm mt-1">{errors.height}</p>
            )}
          </div>
        </div>

        {/* Metrekare Fiyatı */}
        <label
          className="block mt-4 mb-1 font-semibold text-gray-700"
          htmlFor="pricePerSquareMeter"
        >
          Metrekare Fiyatı (₺) *
        </label>
        <input
          id="pricePerSquareMeter"
          name="pricePerSquareMeter"
          type="number"
          min={0}
          step="0.01"
          value={product.pricePerSquareMeter}
          onChange={handleChange}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.pricePerSquareMeter
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-blue-500"
          }`}
          placeholder="Metrekare fiyatını girin"
        />
        {errors.pricePerSquareMeter && (
          <p className="text-red-500 text-sm mt-1">{errors.pricePerSquareMeter}</p>
        )}

        {/* Alan ve Toplam Fiyat Gösterimi */}
        <div className="mt-4 p-3 bg-gray-100 rounded-md text-gray-700">
          <p>
            <strong>Alan: </strong> {area.toFixed(2)} m²
          </p>
          <p>
            <strong>Toplam Fiyat: </strong>{" "}
            {totalPrice > 0 ? totalPrice.toFixed(2) + " ₺" : "-"}
          </p>
        </div>

        {/* Renk */}
        <label
          className="block mt-4 mb-1 font-semibold text-gray-700"
          htmlFor="color"
        >
          Renk
        </label>
        <input
          id="color"
          name="color"
          type="text"
          value={product.color}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Örn: Kırmızı, Mavi"
        />

        {/* Açıklama */}
        <label
          className="block mt-4 mb-1 font-semibold text-gray-700"
          htmlFor="description"
        >
          Açıklama
        </label>
        <textarea
          id="description"
          name="description"
          value={product.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="İsterseniz detaylı açıklama ekleyin"
        />

        {/* Kaydet Butonu */}
        <button
          type="submit"
          className="mt-6 w-full bg-gradient-to-r from-blue-700 to-blue-500 text-white py-3 rounded-md font-semibold hover:from-blue-600 hover:to-blue-400 transition"
        >
          Ürünü Kaydet
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
