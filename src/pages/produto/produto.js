import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import { FaUndo, FaShieldAlt, FaTruck } from "react-icons/fa";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import "./produto.css";

function Produto() {
  const { id } = useParams();
  const [produtoInfo, setProdutoInfo] = useState({});
  const [quantidade, setQuantidade] = useState(1); // Estado para a quantidade
  const [produtoAdicionado, setProdutoAdicionado] = useState(false);

  useEffect(() => {
    findProd(id);
  }, [id]);

  async function findProd(idProd) {
    // let prod = listaProdutos.find((produto) => produto.id === value);
    // setProdutoInfo(prod);
    try {
      const resposta = await api.get(`produto/obter?Id=${idProd}`);
      setProdutoInfo(resposta.data);
      console.log(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar todos produtos:', erro.response ? erro.response.data : erro.message);
    }
  }

  // Função para adicionar o produto ao carrinho
  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtoNoCarrinho = cart.find(produto => produto.id === produtoInfo.id);

    if (produtoNoCarrinho) {
      // Atualizar a quantidade do produto já existente
      produtoNoCarrinho.quantidade += quantidade;
    } else {
      // Adicionar um novo produto ao carrinho
      cart.push({ ...produtoInfo, quantidade });
    }

    localStorage.setItem('carrinho', JSON.stringify(cart));
    setProdutoAdicionado(true);
    setTimeout(() => setProdutoAdicionado(false), 3000);
  };

  // Funções para alterar a quantidade
  const aumentarQuantidade = () => {
    if (quantidade < 12) setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  return (
    <div>
      <Header />
      <Container>
        <section className="prod_escolhido my-5">
          <Row>
            <Col md={6} className="imgs_prod d-flex justify-content-center">
              <img src={produtoInfo.imagem} alt={produtoInfo.nome} className="img_inicial" />
            </Col>
            <Col md={6} className="info_prod">
              <h2>{produtoInfo.nome}</h2>
              <p className="descricao">{produtoInfo.descricaodet}</p>
              <p className="preco">Preço: R$ {Number(produtoInfo.valor).toFixed(2).replace(".", ",")}</p>
              <p className="desc">Com Desconto: R$ {(produtoInfo.valor * (1 - produtoInfo.desconto)).toFixed(2).replace(".", ",")}</p>

              <h3>Quantidade:</h3>
              <div className="div_btn_quant d-flex align-items-center">
                <button className="diminuir" onClick={diminuirQuantidade}>-</button>
                <p className="quant mx-3 m-1">{quantidade}</p>
                <button className="aumentar" onClick={aumentarQuantidade}>+</button>
              </div>
              <button className="btn_compra mt-3" onClick={addToCart}>Adicionar ao carrinho</button>

              {produtoAdicionado && <div className="alert alert-success mt-3">Produto adicionado ao carrinho!</div>}
            </Col>
          </Row>
        </section>

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
              <p className="information-prods">Segurança completa ao envio da <br /> vegetação.</p>
              <FaTruck className="info-icon mt-2" />
            </Col>
          </Row>
        </section>
      </Container>
      <Footer />
    </div>
  );
}

export default Produto;
