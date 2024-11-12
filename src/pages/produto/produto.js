import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import { FaUndo, FaShieldAlt, FaTruck } from "react-icons/fa"; // Ícones do react-icons
import { useParams } from "react-router-dom";
import { listaProdutos } from "../../data/produtos";
import "./produto.css";

function Produto() {
  const { id } = useParams();
  const [produtoInfo, setProdutoInfo] = useState({});

  useEffect(() => {
    findProd(id);
  }, [id]);

  function findProd(value) {
    let prod = listaProdutos.find((produto) => produto.id === value);
    setProdutoInfo(prod);
  }

  // Função para adicionar o produto ao carrinho (localStorage)
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    // Verificar se o produto já foi adicionado ao carrinho
    const produtoNoCarrinho = cart.find(produto => produto.id === produtoInfo.id);
    if (!produtoNoCarrinho) {
      cart.push(produtoInfo);
      localStorage.setItem('carrinho', JSON.stringify(cart));
    }
  };

  return (
    <div>
      <Header />
      
      <Container>
        {/* Produto Principal */}
        <section className="prod_escolhido my-5">
          <Row>
            {/* Coluna da imagem */}
            <Col md={6} className="imgs_prod d-flex justify-content-center">
              <img src={produtoInfo.imagem} alt={produtoInfo.nome} className="img_inicial" />
            </Col>
            
            {/* Coluna de informações do produto */}
            <Col md={6} className="info_prod">
              <h2>{produtoInfo.nome}</h2>
              <p className="descricao">{produtoInfo.descricao}</p>
              <p className="preco">Preço: R$ {Number(produtoInfo.preco).toFixed(2).replace(".", ",")}</p>
              <p className="desc">Com Desconto: R$ {(produtoInfo.preco * (1 - produtoInfo.desconto)).toFixed(2).replace(".", ",")}</p>

              <h3>Quantidade:</h3>
              <div className="div_btn_quant d-flex align-items-center">
                <button className="aumentar">+</button>
                <p className="quant mx-3 m-1">12</p>
                <button className="diminuir">-</button>
              </div>
              <button className="btn_compra mt-3" onClick={addToCart}>Adicionar ao carrinho</button>
            </Col>
          </Row>
        </section>

         {/* Informações de Entrega */}
         <section className="info_entrega_prod my-4">
          <Row>
            <Col md={4} className="infos p-3 text-center">
              <p className="information-prods">Devolução grátis. Você tem 30 dias a partir da data de recebimento.</p>
              <FaUndo className="info-icon mt-2" />
            </Col>
            <Col md={4} className="infos p-3 text-center">
              <p className="information-prods">Receba o produto que está esperando ou devolvemos o dinheiro.</p>
              <FaShieldAlt className="info-icon mt-2" />
            </Col>
            <Col md={4} className="infos p-3 text-center">
              <p className="information-prods">Segurança completa ao envio da <br/> vegetação.</p>
              <FaTruck className="info-icon mt-2" />
            </Col>
          </Row>
        </section>

        {/* Mais produtos */}
        <section className="mais_prods my-4">
          <h3>Veja também</h3>
          
        </section>
      </Container>

      <Footer />
    </div>
  );
}

export default Produto;
