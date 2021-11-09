import { useContext } from 'react';
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
      <Droppable droppableId="task-list-droppable">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="task-list">
            {tasks.map(({ task, taskId, completed }, index) => (
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
