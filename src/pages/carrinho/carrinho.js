import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import '../../styles/global.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import './carrinho.css';

const Carrinho = () => {
  const navigate = useNavigate();
  const [carrinho, setCarrinho] = useState([]);
  const [totalCompra, setTotalCompra] = useState(0);

  useEffect(() => {
    const produtosNoCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosComQuantidade = produtosNoCarrinho.map(produto => ({
      ...produto,
      quantidade: produto.quantidade || 1, // Define a quantidade inicial como 1
    }));
    setCarrinho(produtosComQuantidade);
    calcularTotal(produtosComQuantidade);
  }, []);

  const calcularTotal = (produtos) => {
    const total = produtos.reduce((acc, produto) => {
      const precoComDesconto = produto.preco * (1 - produto.desconto);
      return acc + precoComDesconto * produto.quantidade;
    }, 0);
    setTotalCompra(total);
  };

  const alterarQuantidade = (produtoId, operacao) => {
    const novosProdutos = carrinho.map((produto) => {
      if (produto.id === produtoId) {
        const novaQuantidade = operacao === 'incrementar'
          ? produto.quantidade + 1
          : produto.quantidade > 1
          ? produto.quantidade - 1
          : produto.quantidade;

        return { ...produto, quantidade: novaQuantidade };
      }
      return produto;
    });
    setCarrinho(novosProdutos);
    localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
    calcularTotal(novosProdutos);
  };

  const removerProduto = (produtoId) => {
    const novosProdutos = carrinho.filter((produto) => produto.id !== produtoId);
    setCarrinho(novosProdutos);
    localStorage.setItem('carrinho', JSON.stringify(novosProdutos));
    calcularTotal(novosProdutos);
  };

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Carrinho de compras</h2>

      <div className="container pb-5">
        <div className="card cart-item mx-auto p-3 text-center mb-4" style={{ width: '98%' }}>
          <div className="row align-items-center">
            <div className="col-md-3"><h5 className="text-green">Produto</h5></div>
            <div className="col-md-2"><h5 className="text-green">Preço</h5></div>
            <div className="col-md-2"><h5 className="text-green">Quantidade</h5></div>
            <div className="col-md-2"><h5 className="text-green">Subtotal</h5></div>
            <div className="col-md-3"><h5 className="text-green">Ação</h5></div>
          </div>
        </div>

        {carrinho.map((produto, index) => (
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
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    className="btn btn-sm btn-secondary me-2"
                    onClick={() => alterarQuantidade(produto.id, 'decrementar')}
                  >
                    -
                  </button>
                  <p className="text-green mb-0">{produto.quantidade}</p>
                  <button
                    className="btn btn-sm btn-secondary ms-2"
                    onClick={() => alterarQuantidade(produto.id, 'incrementar')}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-md-2">
                <p className="text-green">
                  R$ {(produto.preco * (1 - produto.desconto) * produto.quantidade).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="col-md-3">
                <button 
                  className="btn btn-danger mt-3" 
                  onClick={() => removerProduto(produto.id)}>
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mx-auto p-4 mb-5 text-center total-compra" style={{ width: '50%' }}>
        <h5 className="text-green">Compra total</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-green">Total:</h5>
          <p className="text-green h5 mb-0">R$ {totalCompra.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-comprar mb-2 button-fixed-width"  onClick={() =>{ window.scrollTo(0, 0);navigate("/finalizarcompra")}}>Finalizar Compra</button>
          <button className="btn btn-voltarcomp button-fixed-width" onClick={() =>{ window.scrollTo(0, 0);navigate("/promocoes")}} >Voltar a Comprar</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrinho;
