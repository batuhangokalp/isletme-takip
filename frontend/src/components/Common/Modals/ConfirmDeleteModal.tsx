import * as Dialog from '@radix-ui/react-dialog';
import { FaTrash } from 'react-icons/fa';

type ConfirmDeleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName?: string;
};

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed top-1/2 left-1/2 w-[90vw] max-w-md bg-white rounded-xl shadow-lg p-6 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none"
        >
          <div className="flex items-center mb-4">
            <FaTrash className="text-red-600 w-6 h-6 mr-2" />
            <Dialog.Title className="text-lg font-bold text-gray-800">
              Silme Onayı
            </Dialog.Title>
          </div>

          <Dialog.Description className="text-sm text-gray-600 mb-6">
            <strong>{itemName}</strong> silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
          </Dialog.Description>

          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm rounded-md bg-gray-200 hover:bg-gray-300 transition"
              >
                Vazgeç
              </button>
            </Dialog.Close>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
            >
              Sil
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
