import React from 'react';
import { ImageDisplay } from './ImageDisplay';

const pictogramsData = [
  { name: 'Yo', url: 'https://api.arasaac.org/api/pictograms/6632?download=false&plural=false&color=true' }, 
  { name: 'Tú', url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true' }, 
  { name: 'Él', url: 'https://api.arasaac.org/api/pictograms/6481?download=false&plural=false&color=true' }, 
  { name: 'Nosotros', url: 'https://api.arasaac.org/api/pictograms/32306?download=false&plural=false&color=true' },
  { name: 'Ellos', url: 'https://api.arasaac.org/api/pictograms/31906?download=false&plural=false&color=true' }, 
  { name: 'QUERER', url: 'https://api.arasaac.org/api/pictograms/5441?download=false&plural=false&color=true' }, 
  { name: 'CORRER', url: 'https://api.arasaac.org/api/pictograms/6465?download=false&plural=false&color=true' }, 
  { name: 'COMER', url: 'https://api.arasaac.org/api/pictograms/6456?download=false&plural=false&color=true' },
  { name: 'NECESITAR', url: 'https://api.arasaac.org/api/pictograms/37160?download=false&plural=false&color=true' }, 
  { name: 'Yo', url: 'https://api.arasaac.org/api/pictograms/6632?download=false&plural=false&color=true' }, 
  { name: 'Tú', url: 'https://api.arasaac.org/api/pictograms/6625?download=false&plural=false&color=true' }, 
  { name: 'Él', url: 'https://api.arasaac.org/api/pictograms/6481?download=false&plural=false&color=true' }, 
  { name: 'Nosotros', url: 'https://api.arasaac.org/api/pictograms/32306?download=false&plural=false&color=true' },
  { name: 'Ellos', url: 'https://api.arasaac.org/api/pictograms/31906?download=false&plural=false&color=true' }, 
  { name: 'QUERER', url: 'https://api.arasaac.org/api/pictograms/5441?download=false&plural=false&color=true' }, 
  { name: 'CORRER', url: 'https://api.arasaac.org/api/pictograms/6465?download=false&plural=false&color=true' }, 
  { name: 'COMER', url: 'https://api.arasaac.org/api/pictograms/6456?download=false&plural=false&color=true' },
  { name: 'NECESITAR', url: 'https://api.arasaac.org/api/pictograms/37160?download=false&plural=false&color=true' },
];


function App() {
  return (
      <ImageDisplay images={pictogramsData} />
  );
}

export default App;
