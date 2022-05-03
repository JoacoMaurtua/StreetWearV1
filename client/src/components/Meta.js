import React from 'react';
import {Helmet} from 'react-helmet'; //Helmet es una libreria para cambiar los titulos de la page y otra meta data


const Meta = ({title,description,keywords}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta
        name='description'
        content={description}
      ></meta>
        <meta
        name='keywords'
        content={keywords}
      ></meta>
  </Helmet>
  )
};

Meta.defaultProps ={
  title:'This is Street Wear!',
  description:'La tienda Street Wear mas grande del Peru',
  keywords: 'Conviertete en el dueño de la calle!'
}

export default Meta