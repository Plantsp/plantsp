import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Carousel from '../../components/carousel/carousel';


function Home() {
  
  return (
    <div>
        <Header></Header>

        <div className="container py-5">
          <Carousel/>
        </div>

        <Footer></Footer>
    </div> 
  );
}

export default Home;