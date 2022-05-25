import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({
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
         
       <LinkContainer   /*Aqui esta el pedazo de codigo que probablemente contenga el error */
            key={x + 1}
            to={
                !isAdmin
                  ? keyword 
                    ? `/search/${keyword}/page/${x + 1}` //aqui tengo que experimentar
                           
                      : keyword && keyword2
                      ? `/search/${keyword}/${keyword2}/page/${x + 1}` //aqui tengo que experimentar
          
                   : `/page/${x + 1}`
          
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


