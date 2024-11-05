import React from "react";
import "./produto.css"; 
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';

  function Produto (){
    return (
        <div>
        <Header></Header>
    
            <section className="prod_escolhido">
               <div className="imgs_prod">
                    <img src="../../assets/img/planta.png" alt="." className="img_inicial"></img>
    
                    <div className="imgs_esc">
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                        <img src="../../assets/img/planta.png" alt="." className="img_opc"></img>
                    </div>
               </div>
    
               <div className="info_prod">
                    <h2>Nome produto</h2>
                    <p className="descricao">Este é um dos melhores produtos que temos em nossa loja, sua beleza é inegualável.</p>
                    <p className="preco">R$ 150,00</p>
                    <p className="desc">R$ 119,90</p>
                    <p className="estoque">Estoque: 23 disponiveis</p>
    
                    <h3>Quantidade:</h3>
                    <div className="div_btn_quant">
                        <button className="aumentar">+</button>
                        <p className="quant">12</p>
                        <button className="diminuir">-</button>
                    </div>
    
                    <button className="btn_compra">COMPRAR</button>
                    <button className="btn_add">ADD</button>
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