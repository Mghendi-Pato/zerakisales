import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";
import SchoolDetails from "./pages/SchoolDetails";
import Schools from "./pages/Schools";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/schools/:id" element={<SchoolDetails />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
