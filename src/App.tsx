import { Header, NewTask, TaskList } from './components';
import './styles/main.scss';

function App() {
  return (
    <>
      <Header />
      <div className="tasks-container">
        <NewTask />
        <TaskList />
      </div>
    </>
  );
}

export default App;
