// Function that saves token in localStorage
export const setTokenAndDataInLocalStorage = (
  token: string,
  name: string,
  picture_url: string,
  id: string
) => {
  localStorage.setItem('token', token);
  localStorage.setItem('name', name);
  localStorage.setItem('picture_url', picture_url);
  localStorage.setItem('id', id);
};

// Function that recuperates the token from localStorage
export const getTokenAndDataFromLocalStorage = () => {
  const token = localStorage.getItem('token');
  const name = localStorage.getItem('name');
  const picture_url = localStorage.getItem('picture_url');
  const id = localStorage.getItem('id');

  // If no token present send null
  if (!token) {
    return null;
  }

  // Else send data
  return { token, name, picture_url, id };
};

export const updateDataInLocalStorage = (
  newPictureUrl: string,
  newName: string
) => {
  if (newName) {
    localStorage.setItem('name', newName);
  }
  if (newPictureUrl) {
    localStorage.setItem('picture_url', newPictureUrl);
  }
};

// Function to delete token when disconnecting
export const removeTokenFromLocalStorage = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('name');
  localStorage.removeItem('picture_url');
  localStorage.removeItem('id');
};
