import axios from 'axios';

export const createPictogram = ({ name, category, url }) => {
  return axios
    .post('http://localhost:3001/api/pictograms', { name, category, url })
    .then(response => {
      const newPictogram = response.data; // Obtén el nuevo pictograma del servidor
      return newPictogram;
    });
};
