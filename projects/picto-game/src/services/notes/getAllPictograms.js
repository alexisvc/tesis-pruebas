import axios from 'axios';

export const getAllPictograms = () => {
    //Uso de la API
   return axios.get('http://localhost:3001/api/pictograms')
    .then(response => {
        const { data } = response;
        return data;
    });
}