import { Footer, Header, NewTask, TaskList } from './components';
import './styles/main.scss';

function App() {
  return (
    <>
      <div>
        <Header />
        <div className="tasks-container">
          <NewTask />
          <TaskList />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
