import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface EditButtonMobileProps {
  isEditing: boolean;
  handleEditToggle: () => void;
  handleCancelEdit: () => void;
}

export default function EditButtonMobileSection({
  isEditing,
  handleEditToggle,
  handleCancelEdit,
}: EditButtonMobileProps) {
  return (
    <div className="flex pt-4 gap-3">
      <DefaultBtn
        btnText={isEditing ? 'Sauvegarder' : 'Éditer mon profil'}
        btnPage="profile"
        btnEdit={isEditing}
        onClick={handleEditToggle}
      />

      {isEditing && (
        <DefaultBtn
          btnText="Annuler"
          btnPage="profile"
          btnEdit={!isEditing}
          onClick={handleCancelEdit}
        />
      )}
    </div>
  );
}
