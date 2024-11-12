import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/global.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import './carrinho.css';

const Carrinho = () => {
  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Carrinho de compras</h2>

      <div className="container pb-5">
        {/* Primeiro Card */}
        <div className="card cart-item mx-auto p-3 text-center mb-4" style={{ width: '98%' }}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <h5 className="text-green">Produto</h5>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Preço</h5>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Quantidade</h5>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Subtotal</h5>
            </div>
          </div>
        </div>

       
        <div className="card cart-item mx-auto p-3 text-center" style={{ width: '98%' }}>
          <div className="row align-items-center">
            <div className="col-md-3 d-flex flex-column align-items-center">
              <img src="/a/a/a-image.jpg" alt="Produto" className="product-image mb-2 "
              />
              <p className="text-green">Nome do Produto</p>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Preço</h5>
              <p className="text-green">R$ 100,00</p>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Quantidade</h5>
              <p className="text-green">1</p>
            </div>
            <div className="col-md-3">
              <h5 className="text-green">Subtotal</h5>
              <p className="text-green">R$ 100,00</p>
            </div>
          </div>
        </div>
      </div>

       {/* Card de Compra Total */}
      <div className="card mx-auto p-4 mb-5 text-center total-compra" style={{ width: '50%' }}>
        <h5 className="text-green">Compra total</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-green">Total:</h5>
          <p className="text-green h5 mb-0">R$ 152,97</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-primary mb-2 button-fixed-width">Finalizar Compra</button>
          <button className="btn btn-secondary button-fixed-width">Voltar a Comprar</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrinho;
