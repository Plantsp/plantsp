import { useParams } from "react-router-dom";
import React, {useEffect, useState } from 'react';
import { listaProdutos } from "../../data/produtos";

export const Teste = () => {
    const {id} = useParams();

   const [produtoFil, setProdutoFil] = useState({});
   
    useEffect(() => {
        findProd(id);
    },[id]);

    function findProd(value) {
       let prod = listaProdutos.find((produto) => produto.id === value);
       setProdutoFil(prod);
    }

    return (
        <div>
            <h1>id {id}</h1>
            <p>{produtoFil.nome}</p>
        </div>
    );
}

export default Teste;
