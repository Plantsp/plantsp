import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Carousel from '../../components/carousel/carousel';
import Category from '../../components/category/category';

function Home() {
  
  return (
    <div>
        <Header></Header>

        <div className="container py-5">
          <h1 className='title-top'>PESQUISAR POR CATEGORIAS</h1>
          
          <div className="categories-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Category icon='FaLeaf' title="Plantas"/>
            
            <Category icon='GiCactusPot' title="Vasos"/>
            <Category icon='FaHandHoldingWater' title="Adubos"/>
            <Category icon='FaSeedling' title="Sementes"/>
            <Category icon='FaToolsFaSeedling' title="Ferramentas"/>
            <Category icon='FaEarthAsia' title="Terra"/>
            
          </div>
          <h1 className='title-top mb-5'>PESQUISAR POR CATEGORIAS</h1>
          <Carousel/>
        </div>

        <Footer></Footer>
    </div> 
  );
}

export default Home;