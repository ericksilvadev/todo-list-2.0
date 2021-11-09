import { createContext, ReactNode, useEffect, useState } from 'react';

interface ITasksProvider {
  children: ReactNode;
}

interface ITask {
  taskId: string;
  task: string;
  completed: boolean;
}

interface ITasksContext {
  tasks: ITask[];
  setTasks: (param: ITask[]) => void;
}

export const TasksContext = createContext({} as ITasksContext);

export const TasksProvider: React.FC<ITasksProvider> = ({ children }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    const storageTasks = localStorage.getItem('tasks');

    if (storageTasks) {
      setTasks(JSON.parse(storageTasks));
    }
  }, []);

  return <TasksContext.Provider value={{ tasks, setTasks }}>{children}</TasksContext.Provider>;
};
