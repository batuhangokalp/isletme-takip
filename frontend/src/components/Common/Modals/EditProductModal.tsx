import * as Dialog from "@radix-ui/react-dialog";
import React from "react";

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

type Props = {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onChange: (e: React.ChangeEvent<any>) => void;
  onSave: () => void;
  area: number;
  totalPrice: number;
  errors: { [key: string]: string };
};

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  onChange,
  onSave,
  area,
  totalPrice,
  errors,
}: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-w-lg w-[90vw] p-6 bg-white rounded-xl shadow-xl transform -translate-x-1/2 -translate-y-1/2 z-50">
          <Dialog.Title className="text-xl font-bold mb-4 text-gray-800">
            Ürünü Düzenle
          </Dialog.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className="space-y-4"
            noValidate
          >
            {/* Ürün Adı */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Ürün Adı *
              </label>
              <input
                name="name"
                type="text"
                value={product?.name}
                onChange={onChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.name
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Ürün Türü */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Ürün Türü
              </label>
              <select
                name="type"
                value={product?.type}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Halı</option>
                <option>Kilim</option>
                <option>Yorgan</option>
                <option>Diğer</option>
              </select>
            </div>

            {/* Ölçüler */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-gray-700">
                  Genişlik (cm) *
                </label>
                <input
                  name="width"
                  type="number"
                  min={0}
                  value={product?.width}
                  onChange={onChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.width
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.width && (
                  <p className="text-red-500 text-sm mt-1">{errors.width}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-semibold text-gray-700">
                  Yükseklik (cm) *
                </label>
                <input
                  name="height"
                  type="number"
                  min={0}
                  value={product?.height}
                  onChange={onChange}
                  className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                    errors.height
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                />
                {errors.height && (
                  <p className="text-red-500 text-sm mt-1">{errors.height}</p>
                )}
              </div>
            </div>

            {/* Fiyat */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Metrekare Fiyatı (₺) *
              </label>
              <input
                name="pricePerSquareMeter"
                type="number"
                min={0}
                step="0.01"
                value={product?.pricePerSquareMeter}
                onChange={onChange}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.pricePerSquareMeter
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              />
              {errors.pricePerSquareMeter && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pricePerSquareMeter}
                </p>
              )}
            </div>

            {/* Alan ve Toplam */}
            <div className="mt-2 p-3 bg-gray-100 rounded-md text-gray-700 text-sm">
              <p>
                <strong>Alan:</strong> {area.toFixed(2)} m²
              </p>
              <p>
                <strong>Toplam Fiyat:</strong>{" "}
                {totalPrice > 0 ? `${totalPrice.toFixed(2)} ₺` : "-"}
              </p>
            </div>

            {/* Renk */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Renk
              </label>
              <input
                name="color"
                type="text"
                value={product?.color}
                onChange={onChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Açıklama */}
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Açıklama
              </label>
              <textarea
                name="description"
                value={product?.description}
                onChange={onChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Butonlar */}
            <div className="mt-6 flex justify-end gap-2">
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                >
                  Vazgeç
                </button>
              </Dialog.Close>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
              >
                Kaydet
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
