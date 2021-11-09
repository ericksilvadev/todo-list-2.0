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
      <footer>
        Challenge by{' '}
        <a href="https://www.frontendmentor.io/home" target="_blank" rel="noopener noreferrer">
          Frontend Mentor
        </a>
        . Coded by{' '}
        <a href="https://github.com/ericksilvadev" target="_blank" rel="noopener noreferrer">
          Erick Silva
        </a>
      </footer>
    </>
  );
}

export default App;
