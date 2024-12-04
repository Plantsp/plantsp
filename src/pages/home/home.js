import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';
import ProdCarousel from '../../components/carousel/prodcarousel';
import CategorySearch from '../../components/category/category';
// import { listaProdutos } from '../../data/produtos';
import ProductCard from '../../components/card/ProductCard';
import ImgCarousel from '../../components/carousel/imgcarousel';
import SpecialOffer from '../../components/SpecialOffer/specialoffer';
import api from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");

  useEffect(() => {
    todosProdutos();
  }, []);

  async function todosProdutos() {
    try {
      const resposta = await api.get('produto/obter/todos');
      setProducts(resposta.data);
    } catch (erro) {
      console.log('Erro ao buscar todos produtos:', erro.response ? erro.response.data : erro.message);
    }
  }

  async function filterCategory (category) {
    try {
      const resposta = await api.get(`produto/obter/categoria?categoria=${category}`);
      setProducts(resposta.data);
    } catch (erro) {
      console.log(`Erro ao buscar produtos da categoria ${category} :`, erro.response ? erro.response.data : erro.message);
    }

    setActiveCategory(category);
  }

  return (
    <div>
        <Header></Header>

        <ImgCarousel/>
        <div className="container py-5">
          <CategorySearch filterCategory={filterCategory} activeCategory={activeCategory}/>

          <Row className="px-4">
          {
            products.map((produto, index) => {
              return (
                <Col className="d-flex align-items-stretch py-3" xs={12} sm={12} md={4} lg={4}>
                  <ProductCard produto={produto} key={index}/>
                </Col>
              )
            })
          }
          </Row>

          {/* <h1 className='title-top mb-5'>PESQUISAR POR CATEGORIAS</h1> */}
          <SpecialOffer/>
          <ProdCarousel products={products.splice(0, 9)}/>
        </div>

        <Footer></Footer>
    </div> 
  );
}

export default Home;

