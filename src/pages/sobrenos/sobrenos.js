import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./sobrenos.css"; 
import '../../styles/global.css';
import Header from '../../components/header/headerdesktop';
import Footer from '../../components/footer/footer';

const SobreNos = () => {
  return (
    <div>
    <Header></Header>
        <div className="sobre-container pt-2 my-5">
            <div className="row align-items-center">
                {/* Imagem */}
                <div className="col-md-6 d-none d-md-block">
                    <img className="img-esquerda"src="https://img.freepik.com/free-photo/gardening-concept-with-hands-holding-plant_23-2147673257.jpg?t=st=1728923931~exp=1728927531~hmac=06eb284a09faace79c90bae0f69f8301423fb1584d0ee638b9f928a9abc4a567&w=740"alt="Sobre Nós"/>
                </div>
                {/* Texto */}
                <div className="col-12 col-md-6">
                    <h2 className="title-top">Sobre Nós</h2>
                    <p className="text-info-sobre">
                    São Paulo é uma cidade marcada por arranha-céus que muitas vezes ocupam espaços que poderiam ter 
                    árvores e vegetação. Diante dessa realidade, surgiu a PlantSP, um e-commerce dedicado à venda de 
                    plantas e artigos de jardinagem, com foco na sustentabilidade.
                    Nosso objetivo é proporcionar uma plataforma online acessível, permitindo que paulistanos adquiram 
                    facilmente plantas e produtos de jardinagem, ajudando a criar espaços verdes em suas casas.
                    Queremos ser um símbolo de esperança e transformação, auxiliando as pessoas a cultivar seu próprio 
                    refúgio verde na capital.
                    </p>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default SobreNos;
