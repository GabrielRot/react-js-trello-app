import './Column.scss';
import Card from '../Card/Card';
import { mapOrder } from '../../utilities/sort';
import { Container, Draggable } from "react-smooth-dnd";


const Column = (props) => {

  const { column, onCardDrop } = props; 
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  return (
    <>
      <div className="column">
        <header className="column-drag-handle">{ column.title }</header>
        <div className="card-list">
          <Container
            // onDragStart={e => console.log("drag started", e)}
            // onDragEnd={e => console.log("drag end", e)}
            // onDragEnter={() => {
            //   console.log("drag enter:", column.id);
            // }}
            // onDragLeave={() => {
            //   console.log("drag leave:", column.id);
            // }}
            // onDropReady={p => console.log('Drop ready: ', p)}
            groupName="col"
            onDrop={ (dropResult) => onCardDrop(dropResult, column.id) }
            getChildPayload={index => cards[index]}
            dragClass="card-ghost"
            dropClass="card-ghost-drop"
            dropPlaceholder={{                      
              animationDuration: 150,
              showOnTop: true,
              className: 'card-drop-preview' 
            }}
            dropPlaceholderAnimationDuration={200}
          >
            { cards && cards.length > 0 && cards.map((card, index) => {
              return (
                <Draggable key={card.id}>
                  <Card card={ card }/>
                </Draggable>
              )
            })}

          </Container>
        </div>
        <footer>
          <div className='footer-action'>
            <i className='fa fa-plus'></i>    Add another card
          </div>
        </footer>
      </div>
    </>
  )
}

export default Column;