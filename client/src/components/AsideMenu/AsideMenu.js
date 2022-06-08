import React from 'react';
import './AsideMenu.scss';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const AsideMenu = ({ price, setPrice, keyword, keyword2 }) => {
  
  //Aqui todo se pasara por props practicamente y se maperara de modo que quede dinamico
  return (
    <div className="filters">
      <h4>Filtros</h4>
      <div className="category fcontainer">
        <h5>Categoria</h5>
        <Form>
          <Link to = {`/search/${keyword}/${keyword2}/Urbanas`}> 
            <Form.Check
              type={'checkbox'}
              id={'urbanas'}
              label={'Urbanas'}
            />
          </Link>
          
          <Link to = {`/search/${keyword}/${keyword2}/Deportivas`}> 
            <Form.Check
              type={'checkbox'}
              id={'deportivas'}
              label={'Deportivas'}
            />
          </Link>
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
        <Form>
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
        </Form>
      </div>

      {/* AQUI IRA EL DIV DE LAS TALLAS DESPUES */}

      <div className="filter-btn">
        <button>
          Filtrar <i class="fas fa-filter"></i>
        </button>
      </div>
    </div>
  );
};

export default AsideMenu;

//https://www.youtube.com/watch?v=I3i2uHsitMw
