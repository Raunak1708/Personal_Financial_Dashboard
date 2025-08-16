import {Link} from "react-router-dom"

function Navbar(){
    return (
        <nav className="bg-blue-600 text-white p-4 flex gap-6">
            <Link to="/" className="hover:underline">Dashboard</Link>
            <Link to="/transactions" className="hover:underline">Transactions</Link>
            <Link to="/budgets" className="hover:underline">Budgets</Link>
            <Link to="settings" className="hover:underline">Settings</Link>
        </nav>
    )
}

export default Navbar