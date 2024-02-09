import React, { useState } from 'react';
import {SectionStyled} from '../Section.styled';
import './AddListStyle.css';

const AddList = ({ addLeitura }) => {
  const  [titulo, setTitulo] = useState('');
  const  [pagLidas, setPagLidas] = useState(0);
  const  [totalPag, setTotalPag] = useState(0);
  const  [categoria, setCategoria] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!titulo || !categoria || pagLidas > totalPag) return console.log("Algo deu errado!");

    addLeitura(titulo, pagLidas, totalPag, categoria);

    setTitulo("");
    setPagLidas(0);
    setTotalPag(0);
    setCategoria("");
  }

  const [state, setState] = useState(false);
  const toggle = ()=> {
    setState(!state);
  };
  
  return (
    <SectionStyled>
        <div className='add-principal'>

          <div className='adicionar' onClick={toggle}>
            <h3>Adicionar nova leitura</h3>
          </div>

          <div className={'div-form '+ (state ? "ativo":"")}> 
            <form onSubmit={handleSubmit}>
              <div className='infos-form'>
                <label>Título: </label>
                <input type="text" value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}/>
              </div>

              <div className='infos-form'>
                <label>Total de páginas:</label>
                <input type="number" className='numpag' name="numpag" id="inumpagt" min={1} value={totalPag} onChange={(e)=>{setTotalPag(e.target.value)}}/>
              </div>

              <div className='infos-form'>
                <label>Total de páginas lidas:</label>
                <input type="number" className='numpag'  name="numpag" id="inumpagl" min={0} value={pagLidas} onChange={(e)=>{setPagLidas(e.target.value)}}/>
              </div>

              <div className='infos-form'>
                <label>Categoría:</label>
                <select value={categoria} onChange={(e)=>{setCategoria(e.target.value)}} >
                  <option disabled>Selecionar</option>
                  <option value="manhwa">Manhwa</option>
                  <option value="manga">Mangá</option>
                  <option value="ficcao">Ficção</option>
                  <option value="Aventura">Aventura</option>
                  <option value="terror">Terror</option>
                </select>
              </div>

              <div className='infos-form'>
                <button type="submit">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
    </SectionStyled>
  )
};

export default AddList;