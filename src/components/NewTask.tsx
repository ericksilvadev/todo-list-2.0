import { useContext, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { TasksContext } from '../context/tasks';

const NewTask = () => {
  // const [newTask, setNewTask] = useState('');
  const { tasks, setTasks } = useContext(TasksContext);

  interface IForm {
    newTask: string;
  }

  const newTaskSchema = yup.object().shape({
    newTask: yup.string().required(),
  });

  const handleSubmit = (values: IForm) => {
    const newTaskObj = {
      task: values.newTask,
      taskId: values.newTask + (tasks.length + 1),
      completed: false,
    };
    const updateTasks = [...tasks, newTaskObj];
    setTasks(updateTasks);
  };

  return (
    <Formik
      initialValues={{ newTask: '' }}
      onSubmit={(values) => handleSubmit(values)}
      validationSchema={newTaskSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <Field
            type="text"
            name="newTask"
            placeholder="Create a new todo..."
            className={`new-task ${errors.newTask && touched.newTask ? 'error' : ''}`}
            autoComplete="no"
          />
          {/* {errors.newTask && touched.newTask ? <span>{errors.newTask}</span> : null} */}
        </Form>
      )}
    </Formik>
  );
};

export default NewTask;
