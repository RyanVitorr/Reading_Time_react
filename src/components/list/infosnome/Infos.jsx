import React from 'react';
import '../infosnome/InfosStyle.css';

const Infos = ({ palavraTexto, visivel, posicao }) => {

    const estilo = {
        display: visivel ? 'flex' : 'none',
        bottom: posicao
    };

    return (
        <div className='nome-porc' style={estilo}>
            <p>{palavraTexto}</p>
        </div>
    )
}

export default Infos;