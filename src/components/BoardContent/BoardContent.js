import './BoardContent.scss';
import Column from '../Column/Column';
import { initData } from '../../actions/initData';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { mapOrder } from '../../utilities/sort';
import { Container, Draggable } from "react-smooth-dnd";
import { applyDrag } from '../../utilities/dragDrop';


const BoardContent =  () => {
  const [board, setBoard] = useState({});
  const [columns, setColumns] = useState([]);

  
  useEffect(() => {
    const boardInitData = initData.boards.find(item => item.id === 'board-1');

    if (boardInitData) {
      setBoard(boardInitData);

      // Sort columns
      setColumns(mapOrder(boardInitData.columns, boardInitData.columnOrder, 'id'))
    }
  }, []);

  const onColumnDrop = (dropResult) => {
    let newColumns = [...columns];
    newColumns = applyDrag(newColumns, dropResult);

    let newBoard = { ...board };
    newBoard.columnOrder = newColumns.map(column => column.id); 
    newBoard.columns = newColumns;  

    setColumns(newColumns);
    setBoard(newBoard);
  }

  const onCardDrop = (dropResult, columnId) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      console.log('>>> inside onCardDrop: ', dropResult, ' with column id: ', columnId);

      let newColumns = [...columns];

      let currentColumns = newColumns.find(column => column.id === columnId);

      currentColumns.cards     = applyDrag(currentColumns.cards, dropResult);
      currentColumns.cardOrder = currentColumns.cards.map(card => card.id);
      
      setColumns(newColumns);
    }
  }

  if (_.isEmpty(board)) {
    return (
      <>
        <div className="not-found">Board not found</div>
      </>
    );
  }

  return (
    <>
      <div className="board-columns">
      <Container
          orientation="horizontal"
          onDrop={onColumnDrop}
          getChildPayload={index => columns[index]}
          dragHandleSelector=".column-drag-handle"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'column-drop-preview'
          }}
        >
          
        {columns && columns.length > 0 && columns.map((column, index) => {
          return (
            <Draggable key={column.id}>
              <Column 
                column={column}   
                onCardDrop={ onCardDrop }
              />
            </Draggable>
          )
        }) }

          <div className='add-new-column'>
            <i className='fa fa-plus icon'></i> Add another column
          </div>

        </Container>
      </div>  
    </>
  )
}

export default BoardContent;