import { useState, useEffect } from 'react';
import {Wrapper} from '../components/Wrapper.style';
import Search from '../components/search/Search';
import List from '../components/list/List';
import AddList from '../components/addList/AddList';
import { SectionStyled } from '../components/Section.styled';

function App() {
  const [lista, setLista] = useState([
    {
      id: 1,
      titulo: "Solo Leveling",
      paglidas: 1000,
      totalpag: 1000,
      categoria: "manhwa",
      porcentagem: 0,
      completo: false
      
    },
    {
      id: 2,
      titulo: "Tower of God",
      paglidas: 515,
      totalpag: 1000,
      categoria: "manhwa",
      porcentagem: 0,
      completo: false
    },
  ]);


  const addLeitura = (titulo, paglidas, totalpag, categoria) => {
    const newLista = [...lista, {
      id: lista.length + 1,
      titulo,
      paglidas,
      totalpag,
      categoria,
      porcentagem: 0

    },]

    setLista(newLista);
    console.log(newLista);
  };

  const [pagAtt, setPagAtt] = useState('');
  const attPagLidas = (id, pagAttParam, setLista) => {
    const newLista = lista.map(list => {
      if(list.id === id && list.paglidas <= list.totalpag) {
        const pagLidas = parseInt(list.paglidas) + parseInt(pagAttParam);
        if (pagLidas <= list.totalpag){
          return {...list, paglidas: pagLidas}
        }
        return list;
      }
      return list;
    });
    setLista(newLista);
  };
  
  const removerLista = (id) => {
    setLista(prevLista => {
      const novaLista = prevLista.filter(item => item.id !== id);
      return novaLista;
    });
  };

  const completarLeitura = (id)=> {
    const novaLista = [... lista];
    novaLista.map((list)=>list.id === id ? list.completo = !list.completo : list);
    setLista(novaLista);
  };

  const [search, setSearch] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todos');

  useEffect(() => {
    if (lista.length === 0) return;
    
    const newLista = lista.map(list => {
      if (list.paglidas !== undefined && list.totalpag !== 0) {
        return {
          ...list,
          porcentagem: Math.round((list.paglidas / list.totalpag) * 100)
        };
      }
      return list;
    });
    
    if (JSON.stringify(newLista) !== JSON.stringify(lista)) {
      setLista(newLista);
    };
  }, [lista]);

  return (
    <Wrapper>
      <Search setSearch={setSearch} setFiltroCategoria={setFiltroCategoria}/>
      <SectionStyled>
        <div className='div-principal-list'>
          <div className='titulo-list'>
            <h1>Lista de leituras:</h1>   
          </div>

          <div className='container-card'>
            {lista
              .filter((list)=> 
                filtroCategoria === 'todos'? true : filtroCategoria === 'completos' ? list.completo : list.categoria.includes(filtroCategoria))
              .filter((list)=> 
                list.titulo.toLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((list)=>(
              <List key={list.id} list={list} attPagLidas={attPagLidas} setPagAtt={setPagAtt} pagAtt={pagAtt} setLista={setLista} removerLista={removerLista} completarLeitura={completarLeitura}/>
          ))}
          </div>
         
        </div>
      </SectionStyled>
      
      <AddList addLeitura={addLeitura}/>
    </Wrapper>
  )
};

export default App;
