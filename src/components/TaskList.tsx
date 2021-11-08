import { useContext } from 'react';
import { TasksContext } from '../context/tasks';

import checkIcon from '../images/icon-check.svg';
import crossIcon from '../images/icon-cross.svg';

const TaskList = () => {
  const { tasks } = useContext(TasksContext);
  return (
    <ul className="task-list">
      {tasks.map(({ task, taskId, completed }) => (
        <li key={taskId}>
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
      ))}
    </ul>
  );
};

export default TaskList;
