import React, { useEffect } from 'react';
import './ListStyle.css';
import { useState } from 'react';
import Infos from './infosnome/Infos';

const List = ({ list, attPagLidas, setPagAtt, pagAtt, setLista, removerLista, completarLeitura }) => {
  const handleAttPag = (e) => {
    e.preventDefault();
    
    attPagLidas(list.id, pagAtt, setLista);
    setPagAtt('');
  };

  const [exibirTextPorc, setExibirTextPorc] = useState(false);
  const [exibirTextPag, setExibirTextPag] = useState(false);
  const [exibirTextExc, setExibirTextExc] = useState(false);

  const [palavra, setPalavra] = useState(null);
  const handleMouseOver = (palavraTexto) => {
    setPalavra(palavraTexto);
  };

  const handleMouseOut = () => {
    setPalavra(null);
  }
 
  const [larguraPadding, setLarguraPadding] = useState("");
  const estilo = {
    padding: larguraPadding < 300 ? " 0 " : "2px 10px"
  };
  const [larguraTela, setLarguraTela] = useState(window.innerWidth);

  useEffect (()=> {
    const handleLarguraTela = () => {
      const novaLargura = window.innerWidth;
      if (novaLargura !== larguraTela) {
        setLarguraTela(novaLargura);
        setLarguraPadding(larguraTela)
      }
    };

    window.addEventListener('resize', handleLarguraTela);

    return () => {
      window.removeEventListener('resize', handleLarguraTela);
    }
  
  }, [larguraTela]);  
  return (
    <div className='card-lista'>
      <div className='titulo'>
        <h3  style={{textDecoration: list.completo ? "line-through" : ""}}>{list.titulo}</h3>

        <div className='bnt-com-exc'>
          <div className='bnt-div-com' onMouseEnter={()=>{handleMouseOver('Completar')}} onMouseLeave={handleMouseOut} onClick={()=>{completarLeitura(list.id)}}>
            <button className={(larguraTela < 300 ? 'completar-p' : 'completar-m')} estyle={estilo}>{larguraTela < 300 ? <i className="bi bi-check"></i> : ' Completar'}</button>

            <Infos palavraTexto={'Completar'} visivel={palavra === 'Completar'} posicao={'35px'}/>
          </div>

          <div className='bnt-div-exc' onMouseEnter={()=>{handleMouseOver('Excluir')}} onMouseLeave={handleMouseOut}>
            <button className='excluir' onClick={()=> removerLista(list.id)} >
              <i className ="bi bi-trash"></i>
            </button>
            <Infos palavraTexto={'Excluir'} visivel={palavra === 'Excluir'} posicao={'35px'}/>
          </div>
         
        </div>
      </div>

      <div className='infos'>
        <div className='circulo-porc' onMouseEnter={()=>{handleMouseOver("Porcentagem lida")}} onMouseLeave={handleMouseOut}>
          <svg >
            <circle cx={27} cy={27} r={27}></circle>
            <circle  style={{ strokeDashoffset: 170 - (170 * list.porcentagem) / 100 }} cx={27} cy={27} r={27}></circle>
          </svg>
          <div className='number-porc'>
            <p>{list.porcentagem + ' %'}</p>
          </div>
          <Infos palavraTexto={"Porcentagem lida"} visivel={palavra === "Porcentagem lida"}/>
        </div>

        <div className='paginas' onMouseEnter={()=>{handleMouseOver("Páginas lidas")}} onMouseLeave={handleMouseOut}>
          <p>{list.paglidas}</p>
          <Infos palavraTexto={"Páginas lidas"} visivel={palavra === "Páginas lidas"}/>
        </div>

      </div>

      <div className='atualizar'>
        <form onSubmit={handleAttPag}>
          <div className='add-pagina'>
            <label>Páginas lidas:</label>
            <input type="number" min={1}  onChange={(e) => { setPagAtt(e.target.value) }} />
          </div>
          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  )
};

export default List;