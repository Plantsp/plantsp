import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Carousel from '../../components/carousel/carousel';
import CategorySearch from '../../components/category/category';
import { listaProdutos } from '../../data/produtos';
import ProductCard from '../../components/card/ProductCard';

function Home() {
  const [products, setProducts] = useState(listaProdutos);

  const filterCategory = (category) =>{
    setProducts(listaProdutos.filter((produto) => produto.categoria == category));
  }

  return (
    <div>
        <Header></Header>

        <div className="container py-5">
          <CategorySearch filterCategory={filterCategory}/>

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

          <h1 className='title-top mb-5'>PESQUISAR POR CATEGORIAS</h1>
          <Carousel products={listaProdutos}/>
        </div>

        <Footer></Footer>
    </div> 
  );
}

export default Home;