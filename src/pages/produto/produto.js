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
                    <img src="~/assets/img/planta.png" alt="aaa"></img>
    
                    <div className="imgs_esc">
                        <img src="~/assets/img/planta.png" alt="aaa" className="img_opc"></img>
                        <img src="~/assets/img/planta.png" alt="aaa" className="img_opc"></img>
                        <img src="~/assets/img/planta.png" alt="aaa" className="img_opc"></img>
                        <img src="~/assets/img/planta.png" alt="aaa" className="img_opc"></img>
                    </div>
               </div>
    
               <div className="info_prod">
                    <h2>Nome produto</h2>
                    <p>R$ 150,00</p>
                    <p>R$ 119,90</p>
                    <p>Estoque: 23 disponiveis</p>
    
                    <h3>Quantidade:</h3>
                    <div className="div_btn_quant">
                        <button>+</button>
                        <p>12</p>
                        <button>-</button>
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