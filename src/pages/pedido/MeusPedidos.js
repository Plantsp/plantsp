import React, { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/global.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';

// import './meuspedidos.css';

const MeusPedidos = () => {
//   const navigate = useNavigate();
  const [pedidos, setPedidos] = useState([]);
  const [totalPedido, setTotalPedido] = useState(0);

  useEffect(() => {
    // Recupera os pedidos do localStorage
    const pedidosConcluidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    setPedidos(pedidosConcluidos);
    calcularTotal(pedidosConcluidos);
  }, []);

  const calcularTotal = (produtos) => {
    const total = produtos.reduce((acc, produto) => {
      const precoComDesconto = produto.preco * (1 - produto.desconto);
      return acc + precoComDesconto * produto.quantidade;
    }, 0);
    setTotalPedido(total);
  };

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Meus Pedidos</h2>

      <div className="container pb-5">
        <div className="card cart-item mx-auto p-3 text-center mb-4" style={{ width: '98%' }}>
          <div className="row align-items-center">
            <div className="col-md-3"><h5 className="text-green">Produto</h5></div>
            <div className="col-md-2"><h5 className="text-green">Preço</h5></div>
            <div className="col-md-2"><h5 className="text-green">Quantidade</h5></div>
            <div className="col-md-2"><h5 className="text-green">Subtotal</h5></div>
          </div>
        </div>

        {pedidos.length > 0 ? pedidos.map((produto, index) => (
          <div key={index} className="card cart-item mx-auto p-3 mb-3 text-center" style={{ width: '98%' }}>
            <div className="row align-items-center">
              <div className="col-md-3 d-flex flex-column align-items-center">
                <img src={produto.imagem} alt={produto.nome} className="product-image mb-2" />
                <p className="text-green">{produto.nome}</p>
              </div>
              <div className="col-md-2">
                <p className="text-green">R$ {Number(produto.preco * (1 - produto.desconto)).toFixed(2).replace('.', ',')}</p>
              </div>
              <div className="col-md-2">
                <p className="text-green">{produto.quantidade}</p>
              </div>
              <div className="col-md-2">
                <p className="text-green">
                  R$ {(produto.preco * (1 - produto.desconto) * produto.quantidade).toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </div>
        )) : (
          <p className="text-center">Você ainda não tem pedidos.</p>
        )}
      </div>

      <div className="card mx-auto p-4 mb-5 text-center total-compra" style={{ width: '50%' }}>
        <h5 className="text-green">Compra total</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-green">Total:</h5>
          <p className="text-green h5 mb-0">R$ {totalPedido.toFixed(2).replace('.', ',')}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MeusPedidos;
