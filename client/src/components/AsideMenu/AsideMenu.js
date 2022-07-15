import React from 'react';
import './AsideMenu.scss';
import { Form } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useParams, useHistory } from 'react-router-dom';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const AsideMenu = ({ price, setPrice }) => {
  //Aqui todo se pasara por props practicamente y se maperara de modo que quede dinamico

  //1****Al darle click a diferentes casillas

  const history = useHistory();

  const params = new URLSearchParams(window.location.search);

  console.log('params: ',params);

  const addStringsToUrl = (e) => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      search: '?checkbox=true'
    })
   
  };

  return (
    <div className="filters">
      <h4>Filtros</h4>
      <div className="category fcontainer">
        <h5>Categoria</h5>
        <Form onSubmit={addStringsToUrl}>
          <Form.Check 
            type={'checkbox'} 
            id={'urbanas'} 
            label={'Urbanas'} 
          />

          <Form.Check
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
          <Form.Check type={'checkbox'} id={'Adidas'} label={'Adidas'} />
          <Form.Check type={'checkbox'} id={'DC'} label={'DC'} />
          <Form.Check type={'checkbox'} id={'Nike'} label={'Nike'} />
          <Form.Check type={'checkbox'} id={'Reebok'} label={'Reebok'} />
          <Form.Check
            type={'checkbox'}
            id={'NewBalance'}
            label={'NewBalance'}
          />
          <Form.Check type={'checkbox'} id={'Fila'} label={'Fila'} />
          <Form.Check type={'checkbox'} id={'Puma'} label={'Puma'} />
          <Form.Check type={'checkbox'} id={'Jordan'} label={'Jordan'} />

          <div className="filter-btn" style={{marginLeft:'0'}}>
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
