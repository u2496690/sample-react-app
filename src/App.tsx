import "./App.css";
import NavBar from "./components/NavBar";
import UserCard from "./components/UserCard";

// Displays react components on the page
const App = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-1 overflow-auto flex-col items-center align-middle justify-center  h-full w-full">
        <UserCard />
      </div>
    </div>
  );
};

export default App;
