import ReactModal from 'react-modal';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface ConfirmDeleteModalProps {
  isConfirmDeleteModalOpen: boolean;
  setIsConfirmDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleConfirmDelete: () => void;
  handleCancelDelete: () => void;
}

export default function ConfirmDeleteModal({
  isConfirmDeleteModalOpen,
  setIsConfirmDeleteModalOpen,
  handleConfirmDelete,
  handleCancelDelete,
}: ConfirmDeleteModalProps) {
  return (
    <ReactModal
      isOpen={isConfirmDeleteModalOpen}
      onRequestClose={() => setIsConfirmDeleteModalOpen(false)}
      style={{
        content: {
          width: '80vw',
          height: 'fit-content',
          maxWidth: '500px',
          margin: 'auto',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: 'white',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <div className="flex flex-col text-center gap-3">
        <p className="flex flex-col">
          Êtes-vous sûr de vouloir supprimer votre compte ?
          <span className="text-red-500 font-medium">
            Cette action est irréversible.
          </span>
        </p>

        <div className="mt-4 flex gap-2">
          <DefaultBtn
            btnText="Oui, supprimer"
            onClick={handleConfirmDelete}
            btnDelete
            btnModalDelete
          />

          <DefaultBtn
            btnText="Annuler"
            onClick={handleCancelDelete}
            btnCancelDelete
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4" />
    </ReactModal>
  );
}
