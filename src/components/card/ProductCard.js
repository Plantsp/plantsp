import ReactStars from "react-rating-stars-component";

function ProductCard({produto}) {
  const planta = process.env.PUBLIC_URL + '/assets/img/planta.png';

  return (
    <div className="card w-100" style={{ cursor: "pointer" }} onClick={() => console.log("produto clicado: ", produto)}>
        <img src={planta} alt='planta' className="card-img-top object-fit-cover" height={240} />
        <div className="card-body">
            <h5 className="card-title">{produto.nome}</h5>
            <p className="card-text">R${produto.preco.toString().replace(".", ",")}</p>
            <ReactStars
              count={5}
              halfIcon={<i className="fa fa-star-half-alt"></i>}
              fullIcon={<i className="fa fa-star"></i>}
              isHalf={true}
              edit={false}
              size={24}
              value={produto.avaliacao}
              activeColor="#ffd700"
            />
        </div>
    </div>
  );
}

export default ProductCard;