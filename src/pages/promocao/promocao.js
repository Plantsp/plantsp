import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import api from '../../services/api';
import ProductCard from '../../components/card/ProductCard';

function Promocao() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    todosProdutosPromocao();
  }, []);

  async function todosProdutosPromocao() {
    try {
      const resposta = await api.get('produto/obter/todos');
      setProducts(resposta.data);
      console.log(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar todos produtos:', erro.response ? erro.response.data : erro.message);
    }
  }

  return (
    <div>
      <Header />
      <h2 className="title-top pt-4">Promoções</h2>
      
      <div className="container pb-5">
        <Row className="px-4">
          {products.map((produto, index) => (
            <Col className="d-flex align-items-stretch py-3" xs={12} sm={12} md={4} lg={4} key={index}>
              <ProductCard produto={produto} />
            </Col>
          ))}
        </Row>
      </div>

      <Footer />
    </div>
  );
}

export default Promocao;
