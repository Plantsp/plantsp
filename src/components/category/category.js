import React from 'react';
import { Col } from 'react-bootstrap';
import { FaLeaf, FaSeedling, FaHandHoldingWater, FaTools } from 'react-icons/fa';
import { GiCactusPot } from "react-icons/gi";
import { GiGroundSprout } from "react-icons/gi";
import './category.css';

function SetIcon(title){
    switch(title){
        case "Plantas":
            return (<FaLeaf className="card-icon" />);
        case "Vasos":
            return (<GiCactusPot  className="card-icon" />);
        case "Adubos":
            return (<FaHandHoldingWater className="card-icon" />);
        case "Ferramentas":
            return (<FaTools className="card-icon" />);
        case "Terra":
            return (<GiGroundSprout className="card-icon" />);
        case "Sementes":
            return (<FaSeedling className="card-icon" />);
        default:
            return null;
    }
}

function Category({title, filterCategory, activeCategory}) {
    return (
        <Col xs={6} sm={6} md={4} lg={2} xl={2}>
            <div 
                className={`w-100 card-category my-5 d-flex flex-column align-items-center justify-content-center ${activeCategory === title ? 'active' : ''}`}
                style={{ cursor:"pointer"}}
                onClick={() => filterCategory(title)}
            >
                {SetIcon(title)}
            
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                </div>
            </div>
        </Col>
        
    );
}

function CategorySearch({filterCategory, activeCategory}){
    return(
        <section>
            <h1 className='title-top'>PESQUISAR POR CATEGORIAS</h1>
            
                <div className="row px-4">
                    <Category title="Plantas" filterCategory={filterCategory} activeCategory={activeCategory}/> 
                    <Category title="Vasos" filterCategory={filterCategory} activeCategory={activeCategory}/>
                    <Category title="Adubos" filterCategory={filterCategory} activeCategory={activeCategory}/>
                    <Category title="Sementes" filterCategory={filterCategory} activeCategory={activeCategory}/>
                    <Category title="Ferramentas" filterCategory={filterCategory} activeCategory={activeCategory}/>
                    <Category title="Terra" filterCategory={filterCategory} activeCategory={activeCategory}/>
                </div>
            
                
        </section>
    )
}


export default CategorySearch;