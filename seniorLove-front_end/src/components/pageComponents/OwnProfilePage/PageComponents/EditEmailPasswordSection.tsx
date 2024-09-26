import editLogo from '/icon/edit.svg';

interface EditEmailPasswordSectionProps {
  setIsEmailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPasswordModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditEmailPasswordSection({
  setIsEmailModalOpen,
  setIsPasswordModalOpen,
}: EditEmailPasswordSectionProps) {
  return (
    <div className="flex flex-row justify-center gap-6">
      <button
        type="button"
        onClick={() => setIsEmailModalOpen(true)}
        className="text-secondaryPink text-center md:text-start px-4 rounded-lg w-fit font-semibold"
      >
        <div className="flex gap-2 self items-center">
          <img src={editLogo} alt="edit" className="w-6 h-6" />
          Modifier l&apos;adresse e-mail
        </div>
      </button>

      <button
        type="button"
        onClick={() => setIsPasswordModalOpen(true)}
        className="text-secondaryPink hover:text-secondaryPinkHover text-center md:text-start px-4 py-2 rounded-lg w-fit font-semibold"
      >
        <div className="flex gap-2 self items-center">
          <img src={editLogo} alt="edit" className="w-6 h-6" />
          Modifier le mot de passe
        </div>
      </button>
    </div>
  );
}
