import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';

interface EditButtonDesktopProps {
  isEditing: boolean;
  handleEditToggle: () => void;
  handleCancelEdit: () => void;
}

export default function EditButtonDesktopSection({
  isEditing,
  handleEditToggle,
  handleCancelEdit,
}: EditButtonDesktopProps) {
  return (
    <div className="flex gap-3 items-center">
      <DefaultBtn
        btnText={isEditing ? 'Sauvegarder' : 'Editer mon profil'}
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
