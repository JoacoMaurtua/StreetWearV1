import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ //DEVO MODIFICAR EL PAGINATE PARA QUE LAS PAGINAS LLEVEN A LAS RUTAS CORRECTAS
  pages,
  page,
  isAdmin = false,
  keyword = '',
  keyword2 = '',
  keyword3 = ''
}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
         
          <LinkContainer   /*Aqui esta el pedazo de codigo que probablemente contenga el error */
                key={x + 1}
                to={
                    !isAdmin
                      ? keyword && keyword2 && keyword3
                        ? `/search/${keyword}/${keyword2}/${keyword3}/page/${x + 1}` //Se distorciona el renderizado tanto con keyword como con keyword2
                              
                          : keyword && keyword2
                          ? `/search/${keyword}/${keyword2}/page/${x + 1}` // si hay dos palabras clave

                          : keyword 
                          ? `/search/${keyword}/page/${x + 1}` // si hay una palabra clave
              
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


