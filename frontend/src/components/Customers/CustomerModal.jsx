import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";

const CustomerModal = ({ formData, onChange, onSubmit, selectedCustomer }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />
      <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-xl font-semibold">
            {selectedCustomer ? "Müşteri Düzenle" : "Yeni Müşteri"}
          </Dialog.Title>
          <Dialog.Close asChild>
            <button className="text-gray-500 hover:text-red-500">
              <FiX />
            </button>
          </Dialog.Close>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ad"
            value={formData.name}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="surname"
            placeholder="Soyad"
            value={formData.surname}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={onChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
          <textarea
            name="address"
            placeholder="Adres"
            value={formData.address}
            onChange={onChange}
            rows={2}
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
          />

          <div className="flex justify-end gap-2">
            <Dialog.Close asChild>
              <button
                type="button"
                className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
              >
                İptal
              </button>
            </Dialog.Close>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90"
            >
              {selectedCustomer ? "Güncelle" : "Kaydet"}
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CustomerModal;
