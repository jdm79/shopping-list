import "./App.css";
import Todo from "./components/Todo";

function App() {
  return (
    <div
      className='container border border-primary rounded mt-5'
      style={{
        backgroundColor: "black",
      }}
    >
      <Todo />
    </div>
  );
}

export default App;
