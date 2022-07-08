import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ //****Aqui enviaria un arreglo de strings en lugar de keywords por separado
  pages,
  page,
  isAdmin = false,
  keyword = '',
  keyword2 = ''
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
         
          <LinkContainer   //5****Aqui tendria que modificar la logica segun el arreglo de strings usando algun prototype*/
                key={x + 1}
                to={
                    !isAdmin
                      ? keyword && keyword2
                        ? `/search/${keyword}/${keyword2}/page/${x + 1}` //Se distorciona el renderizado tanto con keyword como con keyword2
                              
                          : keyword 
                          ? `/search/${keyword}/page/${x + 1}` // si hay dos palabras clave
              
                      : `/page/${x + 1}` //si no hay palabras clave
              
                    : `/admin/productlist/${x + 1}`
                } /* No se exactamente como formar bien las rutas */
              >
                <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer> 
            
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
