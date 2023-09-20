// import Table from "./components/ui/Table";
import { UserContextProvider } from "./context/UserContext";
// import { NameProvider } from "./context/DataContext";

const App2 = () => {
  return (
    <div className="text-center">
      <UserContextProvider>
        App2
        {/* <Table /> */}
      </UserContextProvider>
    </div>
  );
};
export default App2;
