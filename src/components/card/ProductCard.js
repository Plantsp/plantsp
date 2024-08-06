import ReactStars from "react-rating-stars-component";

function ProductCard() {
  const planta = process.env.PUBLIC_URL + '/assets/img/planta.png';
  return (
    <div className="card" style={{ width: "18rem", cursor: "pointer" }}>
        <img src={planta} alt='planta' className="card-img-top" style={{height:240, objectFit: "cover"}}/>
        <div className="card-body">
            <h5 className="card-title">Card title 1</h5>
            <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
            </p>
            <ReactStars
              count={5}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              isHalf={true}
              edit={false}
              size={24}
              value={3.5}
              activeColor="#ffd700"
            />
        </div>
    </div>
  );
}

export default ProductCard;