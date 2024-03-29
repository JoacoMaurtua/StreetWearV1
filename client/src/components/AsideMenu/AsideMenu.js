import React from 'react';
import './AsideMenu.scss';
import { Form } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useHistory } from 'react-router-dom';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const AsideMenu = ({ price, setPrice }) => {
  //Aqui todo se pasara por props practicamente y se maperara de modo que quede dinamico

  //1****Al darle click a diferentes casillas

  const history = useHistory();

  const actualRoute = document.location.pathname; //Me devuelve la URL en un string

  //Funcion para encapsular valores de los checkboxes marcados en un arreglo
  const encapsularCheckboxes =()=>{
    var inputs = document.querySelectorAll('.checkbox-type input:checked+label');
    var checkboxArray = [];
    inputs.forEach(input=>{
        checkboxArray.push(input.textContent);
    });
    return checkboxArray.join('-');
  };

  const secondRoute = encapsularCheckboxes();
  //Funcion para agregar los valores del checkbox a la URL
  const addStringsToUrl = (e) => {
    const secondRoute = encapsularCheckboxes();
    history.push({
      pathname: actualRoute,
      search: `${secondRoute}`, //aca debo agragrle dinamicamente los valores de las casillas
    });
    e.preventDefault();
  };

  //Funcion para extraer los queryStrings en un arreglo de vuelta

  const usingSplit = actualRoute.split('/').splice(2,2);

  const usingSplit2 = secondRoute.split('/')

  console.log('usingSplit?',usingSplit);

  console.log('usingSplit2?',usingSplit2);

  const arregloCompleto = usingSplit.concat(usingSplit2)

  console.log('arregloCompleto', arregloCompleto )

  //NOTA: Paso 1 completado
  
  
  return (
    <div className="filters">
      <h4>Filtros</h4>
      <div className="category fcontainer">
        <h5>Categoria</h5>
        <Form onSubmit={addStringsToUrl}>
          <Form.Check
            className="checkbox-type"
            type={'checkbox'}
            id={'urbanas'}
            label={'Urbanas'}
          />

          <Form.Check
            className="checkbox-type"
            type={'checkbox'}
            id={'deportivas'}
            label={'Deportivas'}
          />
        </Form>
      </div>

      <div className="price fcontainer">
        <h5>Precio</h5>
        <Range
          marks={{
            1: `S/1`,
            3000: `S/3000`,
          }}
          min={1}
          max={3000}
          defaultValue={[1, 3000]}
          tipFormatter={(value) => `S/${value}`}
          tipProps={{
            placement: 'top',
            visible: false,
          }}
          value={price}
          onChange={(price) => setPrice(price)}
        />
      </div>

      <div className="brand fcontainer">
        <h5>Marcas</h5>
        <Form onSubmit={addStringsToUrl}>
          <Form.Check type={'checkbox'} id={'Adidas'} label={'Adidas'}  className="checkbox-type"/>
          <Form.Check type={'checkbox'} id={'DC'} label={'DC'}  className="checkbox-type"/>
          <Form.Check type={'checkbox'} id={'Nike'} label={'Nike'}  className="checkbox-type"/>
          <Form.Check type={'checkbox'} id={'Reebok'} label={'Reebok'}  className="checkbox-type"/>
          <Form.Check
           className="checkbox-type"
            type={'checkbox'}
            id={'NewBalance'}
            label={'NewBalance'}
          />
          <Form.Check type={'checkbox'} id={'Fila'} label={'Fila'}  className="checkbox-type"/>
          <Form.Check type={'checkbox'} id={'Puma'} label={'Puma'}  className="checkbox-type"/>
          <Form.Check type={'checkbox'} id={'Jordan'} label={'Jordan'}  className="checkbox-type"/>

          <div className="filter-btn" style={{ marginLeft: '0' }}>
            <button type="submit">
              Filtrar <i class="fas fa-filter"></i>
            </button>
          </div>
        </Form>
      </div>

      {/* AQUI IRA EL DIV DE LAS TALLAS DESPUES */}
    </div>
  );
};

export default AsideMenu;

//https://www.youtube.com/watch?v=I3i2uHsitMw
