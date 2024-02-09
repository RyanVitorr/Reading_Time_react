import React from 'react';
import './SearchStyle.css';
import {SectionStyled} from '../Section.styled';

const Search = ({ setSearch,setFiltroCategoria }) => {
  return (
    <SectionStyled>
        <div className='div-principal'>
            <form action="">
                <div className='div-input-search'>
                    <input type="search" onChange={(e)=>{setSearch(e.target.value)}}  placeholder='Pesquisar'/>
                </div>
                <div className='div-input-select'>
                    <select onChange={(e)=>{setFiltroCategoria(e.target.value)}}>
                        <option value="" disabled>Filtrar</option>
                        <option value="todos">Todos</option>
                        <option value="completos">Completos</option>
                        <option value="manhwa">Manhwa</option>
                        <option value="manga">Mangá</option>
                        <option value="ficcao">Ficção</option>
                        <option value="Aventura">Aventura</option>
                        <option value="terror">Terror</option>
                        
                    </select>
                </div>
            </form>
        </div>
    </SectionStyled>
  )
};

export default Search;