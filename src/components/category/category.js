import React from 'react';
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


function Category({title, filterCategory}) {
    return (
        <div 
            className="card-category my-5 d-flex flex-column align-items-center justify-content-center" 
            style={{ width: "18rem", cursor:"pointer"}}
            onClick={() => filterCategory(title)}
        >
            {SetIcon(title)}
           
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>
    );
}
  
function CategorySearch({filterCategory}){
    return(
        <section>
            <h1 className='title-top'>PESQUISAR POR CATEGORIAS</h1>
            
            <div className="categories-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Category title="Plantas" filterCategory={filterCategory}/> 
              <Category title="Vasos" filterCategory={filterCategory}/>
              <Category title="Adubos" filterCategory={filterCategory}/>
              <Category title="Sementes" filterCategory={filterCategory}/>
              <Category title="Ferramentas" filterCategory={filterCategory}/>
              <Category title="Terra" filterCategory={filterCategory}/>
            </div>
        </section>
    )
}


export default CategorySearch;