import { useContext, useEffect, useState } from 'react';
import { TasksContext } from '../context/tasks';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Task from './Task';

interface ITask {
  taskId: string;
  task: string;
  completed: boolean;
}

const TaskList = () => {
  const { tasks, setTasks } = useContext(TasksContext);
  const [filter, setFilter] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([...tasks]);

  useEffect(() => {
    if (filter === 'all') setFilteredTasks([...tasks]);
    if (filter === 'active') {
      setFilteredTasks(tasks.filter((task) => !task.completed));
    }
    if (filter === 'completed') {
      setFilteredTasks(tasks.filter((task) => task.completed));
    }
  }, [filter, tasks]);

  const handleClearCompleted = () => {
    const clearTasks = tasks.filter((task) => !task.completed);
    setTasks([...clearTasks]);
  };

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;

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
            {filteredTasks.map(({ task, taskId, completed }, index) => (
              <Task task={task} taskId={taskId} completed={completed} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
