interface DefaultBtnProps {
  btnText: string;
  btnEvent?: string;
  onClick?: () => void;
  btnType?: 'button' | 'submit' | 'reset';
  btnPage?: string;
  btnDelete?: boolean;
  btnMessage?: boolean;
  btnMessageMobile?: boolean;
  btnEdit?: boolean;
  btnModalDelete?: boolean;
  btnValidate?: boolean;
  btnModalPicture?: boolean;
  btnCancelDelete?: boolean;
}

export default function DefaultBtn({
  btnText,
  onClick,
  btnType,
  btnPage,
  btnDelete,
  btnMessage,
  btnMessageMobile,
  btnEdit,
  btnModalDelete,
  btnEvent,
  btnValidate,
  btnModalPicture,
  btnCancelDelete,
}: DefaultBtnProps) {
  const getBackgroundColor = () => {
    if (btnEvent === 'Je participe' || btnValidate) {
      return 'bg-green-500 hover:bg-green-400';
    }
    if (btnDelete) return 'bg-red-600 hover:bg-red-500';
    if (btnMessage || btnEdit) return 'bg-green-500 hover:bg-green-400';
    if (btnCancelDelete) return 'bg-gray-400 hover:bg-gray-300';
    return 'bg-secondaryPink hover:bg-secondaryPinkHover';
  };

  const getSizeAndPadding = () => {
    if (btnPage === 'profile' || btnMessageMobile) {
      return 'text-sm px-2 min-w-24 my-0';
    }
    if (btnModalPicture) {
      return 'text-sm px-2 min-w-24 my-0 md:text-lg md:px-4 md:min-w-44 md:my-4';
    }
    if (btnModalDelete) {
      return 'text-sm px-4 md:min-w-44 my-4';
    }
    return 'text-lg px-4 min-w-44 my-4';
  };

  const buttonClasses = `
    rounded-lg text-white font-bold shadow-md py-1 block mx-auto
    ${getBackgroundColor()}
    ${getSizeAndPadding()}
  `;

  return (
    <button type={btnType} className={buttonClasses} onClick={onClick}>
      {btnText}
    </button>
  );
}
