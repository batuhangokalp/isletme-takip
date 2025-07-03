import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import CustomerModal from "../../components/Customers/CustomerModal";
import ConfirmDeleteModal from "../../components/Common/Modals/ConfirmDeleteModal";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store";
import {
  fetchCustomers,
  updateCustomer,
  addCustomer,
  deleteCustomer,
  Customer,
} from "../../redux/customerSlice";
import { unwrapResult } from "@reduxjs/toolkit";


const CustomerList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { customers, loading, error } = useSelector(
    (state: RootState) => state.customers
  );
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const openAddModal = () => {
    setSelectedCustomer(null);
    setFormData({ name: "", surname: "", phone: "", address: "" });
    setOpen(true);
  };

  const openEditModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setFormData({
      name: customer.name,
      surname: customer.surname,
      phone: customer.phone,
      address: customer.address,
    });
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedCustomer) {
        // Update customer
        const resultAction = await dispatch(
          updateCustomer({ id: selectedCustomer._id, data: formData })
        );
        unwrapResult(resultAction);
        toast.success("Müşteri başarıyla güncellendi!");
      } else {
        // Add new customer
        const resultAction = await dispatch(addCustomer(formData));
        unwrapResult(resultAction);
        toast.success("Müşteri başarıyla eklendi!");
      }

      setOpen(false);
      setSelectedCustomer(null);
      setFormData({ name: "", surname: "", phone: "", address: "",  });
    } catch (err) {
      console.error("Müşteri işlemi başarısız:", err);
      toast.error("Müşteri işlemi başarısız!");
    }
  };

  const handleOpenDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (customer: Customer) => {
    try {
      await dispatch(deleteCustomer(customer._id)).unwrap();
      toast.success("Müşteri başarıyla silindi!");
      setDeleteModalOpen(false);
      setSelectedCustomer(null);
    } catch (err) {
      console.error("Silme işlemi başarısız:", err);
      toast.error("Müşteri silinirken hata oluştu.");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>Hata: {error}</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Müşteriler</h1>
        <button
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition"
          onClick={openAddModal}
        >
          + Müşteri Ekle
        </button>
      </div>

      <div className="overflow-auto rounded-lg shadow border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200 text-sm text-gray-800">
          <thead className="bg-primary text-white text-left">
            <tr>
              <th className="px-6 py-3">Ad</th>
              <th className="px-6 py-3">Soyad</th>
              <th className="px-6 py-3">Telefon</th>
              <th className="px-6 py-3">Adres</th>
              <th className="px-6 py-3">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.surname}</td>
                <td className="px-6 py-4">{customer.phone}</td>
                <td className="px-6 py-4">{customer.address}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(customer)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Düzenle"
                    >
                      <FiEdit size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenDeleteModal(customer)}
                      className="text-red-600 hover:text-red-800"
                      title="Sil"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding new customer or editing*/}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <CustomerModal
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          selectedCustomer={selectedCustomer}
        />
      </Dialog.Root>

      {/* Delete confirmation modal */}
      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          if (!selectedCustomer) return;
          handleDelete(selectedCustomer);
        }}
        itemName={selectedCustomer?.name}
      />
    </div>
  );
};

export default CustomerList;
