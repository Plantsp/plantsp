import React, {useEffect, useState} from "react";
import "./produto.css"; 
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import { useParams } from "react-router-dom";
import { listaProdutos } from "../../data/produtos";

  function Produto (){
    const {id} = useParams();

   const [produtoInfo, setProdutoInfo] = useState({});
   
    useEffect(() => {
        findProd(id);
    },[id]);

    function findProd(value) {
       let prod = listaProdutos.find((produto) => produto.id === value);
       setProdutoInfo(prod);
    }

    return (
        <div>
        <Header></Header>
    
            <section className="prod_escolhido">
               <div className="imgs_prod">
                <img src={produtoInfo.imagem} alt="." className="img_inicial" />
    
                    <div className="imgs_esc">
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                    </div>
               </div>
    
               <div className="info_prod">
                    <h2>{produtoInfo.nome}</h2>
                    <p className="descricao">{produtoInfo.descricao}</p>
                    <p className="preco">R$ {Number(produtoInfo.preco).toFixed(2).replace(".", ",")}</p>
                    <p className="desc">R$ {(produtoInfo.preco * (1 - produtoInfo.desconto)).toFixed(2).replace(".", ",")}</p>
                    {/* <p className="desc">Desconto: {produtoInfo.desconto * 100}%</p> */}
                    {/* <p className="estoque">Estoque: 23 disponiveis</p> */}
    
                    <h3>Quantidade:</h3>
                    <div className="div_btn_quant">
                        <button className="aumentar">+</button>
                        <p className="quant">12</p>
                        <button className="diminuir">-</button>
                    </div>
    
                    <button className="btn_compra">COMPRAR</button>
                    {/* <button className="btn_add">ADD</button> */}
               </div>
            </section>
    
            <section className="info_entrega_prod">
                <div className="infos"></div>
                <div className="infos"></div>
                <div className="infos"></div>
            </section>
    
            <section className="mais_prods">
    
            </section>
    
            <Footer></Footer>
        </div>
      );
  }

export default Produto;