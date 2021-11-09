import React, { useContext } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { TasksContext } from '../context/tasks';

import checkIcon from '../images/icon-check.svg';
import crossIcon from '../images/icon-cross.svg';

interface ITask {
  task: string;
  taskId: string;
  completed: boolean;
  index: number;
}

const Task: React.FC<ITask> = ({ task, taskId, completed, index }) => {
  const { tasks, setTasks } = useContext(TasksContext);

  const handleComplete = () => {
    const taskIndex = tasks.findIndex((task) => task.taskId === taskId);
    console.log(tasks[0].taskId);
    console.log(taskId);

    console.log(tasks);

    const { task, taskId: id, completed } = tasks[taskIndex];

    const updatedTask = { task, taskId, completed: !completed };
    const updatedTasks = [...tasks];

    updatedTasks.splice(taskIndex, 1, updatedTask);
    setTasks(updatedTasks);
  };

  const handleDeleteTask = () => {
    const updatedTasks = tasks.filter((task) => task.taskId !== taskId);

    setTasks(updatedTasks);
  };

  return (
    <Draggable draggableId={taskId} index={index} key={taskId}>
      {(provided, { isDragging }) => (
        <li
          className={isDragging ? 'dragging' : ''}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className={completed ? 'completed' : ''}>
            <button
              type="button"
              className={completed ? 'complete-switch completed' : 'complete-switch'}
              onClick={handleComplete}
            >
              <div className={completed ? 'completed' : ''}>
                {completed && <img src={checkIcon} alt="Check" />}
              </div>
            </button>
            {task}
          </div>
          <button type="button" className="delete-task" onClick={handleDeleteTask}>
            <img src={crossIcon} alt="Delete task" />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;
