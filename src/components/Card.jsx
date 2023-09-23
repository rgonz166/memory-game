const Card = ({ image, selected, onClick }) => {
  return (
    <div className="card hover">
      <div className={selected && "selected"}>
        <img src={image} alt="" className="card-face" />
        <img
          src={"/assets/fireship.png"}
          alt=""
          className="card-back"
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default Card;
