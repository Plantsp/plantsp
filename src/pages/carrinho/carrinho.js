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
    setCarrinho(produtosNoCarrinho);

    // Calcular o total da compra
    const total = produtosNoCarrinho.reduce((acc, produto) => {
      const precoComDesconto = produto.preco * (1 - produto.desconto); // Aplica o desconto
      return acc + precoComDesconto;
    }, 0);
    setTotalCompra(total);
  }, []);

  // Função para remover produto do carrinho
  const removerProduto = (produtoId) => {
    const novosProdutos = carrinho.filter((produto) => produto.id !== produtoId);
    setCarrinho(novosProdutos);
    localStorage.setItem('carrinho', JSON.stringify(novosProdutos)); // Atualiza o localStorage

    // Recalcular o total após remoção
    const total = novosProdutos.reduce((acc, produto) => {
      const precoComDesconto = produto.preco * (1 - produto.desconto);
      return acc + precoComDesconto;
    }, 0);
    setTotalCompra(total);
  };

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4 pb-3">Carrinho de compras</h2>

      <div className="container pb-5">
        {/* Cabeçalho do Carrinho */}
        <div className="card cart-item mx-auto p-3 text-center mb-4" style={{ width: '98%' }}>
          <div className="row align-items-center">
            <div className="col-md-3">
              <h5 className="text-green">Produto</h5>
            </div>
            <div className="col-md-2">
              <h5 className="text-green">Preço</h5>
            </div>
            <div className="col-md-2">
              <h5 className="text-green">Quantidade</h5>
            </div>
            <div className="col-md-2">
              <h5 className="text-green">Subtotal</h5>
            </div>

            <div className="col-md-3">
              <h5 className="text-green">Ação</h5>
            </div>
          </div>
        </div>

        {/* Exibindo os produtos no carrinho */}
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
                <p className="text-green">1</p> {/* dps faço a lógica para adicionar a quantidade, trabalhei demais :)))))*/}
              </div>
              <div className="col-md-2">
                <p className="text-green">R$ {(produto.preco * (1 - produto.desconto)).toFixed(2).replace('.', ',')}</p>
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

      {/* Card de Compra Total */}
      <div className="card mx-auto p-4 mb-5 text-center total-compra" style={{ width: '50%' }}>
        <h5 className="text-green">Compra total</h5>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="text-green">Total:</h5>
          <p className="text-green h5 mb-0">R$ {totalCompra.toFixed(2).replace('.', ',')}</p>
        </div>
        <div className="d-flex flex-column align-items-center">
          <button className="btn btn-comprar mb-2 button-fixed-width">Finalizar Compra</button>
          <button className="btn btn-voltarcomp button-fixed-width" onClick={() =>{ window.scrollTo(0, 0);navigate("/promocoes")}} >Voltar a Comprar</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Carrinho;
