import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";  
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budgets from "./pages/Budgets";
import Settings from "./pages/Settings";
import Navbar from "./components/Navbar";

function App() {
  const transactions=useSelector((state)=>state.transactions.items);
  useEffect(()=>{
    localStorage.setItem("transactions",JSON.stringify(transactions));
  },transactions)
  return (
    <Router>
      {/* <h1>Hello Everyone</h1> */}
      <div className="min-h-screen bg-gray-100 ">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
           <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
