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



function Category({icon, title}) {
    return (
        <div className="card-category my-5" style={{ width: "18rem", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor:"pointer"}}>
            {/* <SetIcon title={title} /> */}
            {SetIcon(title)}
           
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
            </div>
        </div>
    );
}
  
export default Category;