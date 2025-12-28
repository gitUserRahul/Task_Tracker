import "./App.css";

import AddTaskForm from "./components/AddTaskForm";

function App() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <h1 className="text-3xl text-blue-700">Task Tracker</h1>

      <AddTaskForm />
    </div>
  );
}

export default App;
