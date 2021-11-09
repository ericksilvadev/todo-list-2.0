import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../context/tasks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const TaskList = () => {
  const [filter, setFilter] = useState('all');
  const [showWarning, setShowWarning] = useState(false);

  const { tasks, setTasks } = useContext(TasksContext);

  const filterTasks = () => {
    if (filter === 'active') {
      return tasks.filter((task) => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter((task) => task.completed);
    }
    return tasks;
  };

  const handleClearCompleted = () => {
    const clearTasks = tasks.filter((task) => !task.completed);
    setTasks([...clearTasks]);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

    if (filter !== 'all') {
      if (!showWarning) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      }
      return;
    }
    if (!destination) return;
    if (!destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const reorderedTasks = [...tasks];
    const draggedTask = tasks.find(({ taskId }) => taskId === draggableId);

    if (draggedTask) {
      reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, draggedTask);
      setTasks(reorderedTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
      {showWarning && (
        <span className="drag-warning">You cannot reorder tasks while using a filter.</span>
      )}
      <div className="filter-tasks">
        <p className="tasks-left">{tasks.filter((task) => !task.completed).length} items left</p>
        <div className="filter-buttons">
          <button
            type="button"
            className={filter === 'all' ? 'selected' : ''}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            type="button"
            className={filter === 'active' ? 'selected' : ''}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            type="button"
            className={filter === 'completed' ? 'selected' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        <button type="button" className="clear-btn" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
      <Droppable droppableId="task-list-droppable">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
            {filterTasks().map(({ task, taskId, completed }, index) => (
              <Task task={task} taskId={taskId} completed={completed} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
      <p className="drag-info">Drag and drop to reorder list.</p>
    </DragDropContext>
  );
};

export default TaskList;
