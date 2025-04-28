import './Card.scss';

const Card = (props) => {
  const { card } = props;
  return (
    <>
      <div className="card-item">
        { card.image &&  
          <img className="card-cover" src={ card.image }
            onMouseDown={e => e.preventDefault()}
          />
        }
        { card.title }
      </div>
    </>
  );
}

export default Card;