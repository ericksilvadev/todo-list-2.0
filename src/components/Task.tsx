import { Draggable } from 'react-beautiful-dnd';

import checkIcon from '../images/icon-check.svg';
import crossIcon from '../images/icon-cross.svg';

interface ITask {
  task: string;
  taskId: string;
  completed: boolean;
  index: number;
}

const Task: React.FC<ITask> = ({ task, taskId, completed, index }) => {
  return (
    <Draggable draggableId={taskId} index={index} key={taskId}>
      {(provided, { isDragging }) => (
        <li
          className={isDragging ? 'dragging' : ''}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div>
            <button
              type="button"
              className={completed ? 'complete-switch completed' : 'complete-switch'}
            >
              {completed && <img src={checkIcon} alt="Check" />}
            </button>
            {task}
          </div>
          <button type="button" className="delete-task">
            <img src={crossIcon} alt="Delete task" />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
