import CreateLead from "./pages/CreateLead";
import LeadList from "./pages/LeadList";

function App() {
  return (
    <div className="app-container">

      <h1 className="page-title">
        Lead Management System
      </h1>

      <CreateLead />

      <LeadList />

    </div>
  );
}

export default App;
