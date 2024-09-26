import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { IUser } from '../../../../@types/IUser';
import DefaultBtn from '../../../standaloneComponents/Button/DefaultBtn';
import { IHobby } from '../../../../@types/IHobby';
import Loader from '../../../standaloneComponents/Loader/Loader';
import axios from '../../../../axios';

interface EditHobbyModalProps {
  isHobbyModalOpen: boolean;
  addedHobbies: number[];
  setIsHobbyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditedProfile: React.Dispatch<React.SetStateAction<Partial<IUser>>>;
  setNewHobbies: React.Dispatch<React.SetStateAction<IHobby[]>>;
  setAddedHobbies: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function EditHobbyModal({
  isHobbyModalOpen,
  addedHobbies,
  setIsHobbyModalOpen,
  setEditedProfile,
  setNewHobbies,
  setAddedHobbies,
}: EditHobbyModalProps) {
  // State for hobbies
  const [hobbies, setHobbies] = useState<IHobby[]>([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // State for error message
  const [error, setError] = useState<string | null>(null);

  // Function to fetch hobbies
  const fetchHobbies = async () => {
    setError(null);
    try {
      const response = await axios.get('/public/hobbies');
      if (response.data) {
        const data = await response.data;
        setHobbies(data);
      } else {
        throw new Error('Failed to fetch hobbies');
      }
    } catch (err) {
      setError('Error updating hobbies');
      console.error('Error updating hobbies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (hobbyId: number) => {
    setAddedHobbies((prevAddedHobbies) =>
      prevAddedHobbies.includes(hobbyId)
        ? prevAddedHobbies.filter((id) => id !== hobbyId)
        : [...prevAddedHobbies, hobbyId]
    );
  };

  // Function to handle save
  const handleSave = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setEditedProfile((prev) => ({
        ...prev,
        hobbies: hobbies.filter((hobby) => addedHobbies.includes(hobby.id)),
      }));
      setNewHobbies(hobbies.filter((hobby) => addedHobbies.includes(hobby.id)));
      setIsHobbyModalOpen(false);
    } catch (err) {
      setError('Error updating hobbies');
      console.error('Error updating hobbies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch hobbies on modal open
  useEffect(() => {
    if (isHobbyModalOpen) {
      fetchHobbies();
    }
  }, []);

  return (
    <ReactModal
      isOpen={isHobbyModalOpen}
      onRequestClose={() => setIsHobbyModalOpen(false)}
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
      <h3 className="text-xl font-semibold text-secondaryPink mb-4">
        Modifiez vos centres d’intérêt
      </h3>

      <div className="flex flex-col gap-3 h-52 md:h-fit overflow-y-scroll md:overflow-y-auto">
        {error && (
          <div className="text-red-500 bg-red-100 p-2 rounded-md">{error}</div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            {hobbies.map((hobby) => (
              <div key={hobby.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`hobby-${hobby.id}`}
                  checked={addedHobbies.includes(hobby.id)}
                  onChange={() => handleCheckboxChange(hobby.id)}
                  className="form-checkbox h-5 w-5 text-primaryPink"
                />

                <label htmlFor={`hobby-${hobby.id}`} className="text-gray-700">
                  {hobby.name}
                </label>
              </div>
            ))}
          </>
        )}
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <DefaultBtn btnText="Valider" onClick={handleSave} />
      </div>
    </ReactModal>
  );
}
