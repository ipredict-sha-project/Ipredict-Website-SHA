import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import font from 'font-awesome/css/font-awesome.min.css'
import './App.css'

// Import all components
import Dashboard from './Components/Dashboard/Dashboard'
import Alerts from './Components/Alerts/Alerts'
import Analytics from './Components/Analytics/Analytics'
import Devices from './Components/Devices/Devices'
import Forgetpass from './Components/Forgetpass/Forgetpass'
import Reports from './Components/Reports/Reports'
import Security from './Components/Security/Security'
import Sensors from './Components/Sensors/Sensors'
import Settings from './Components/Settings/Setttings'
import Signin from './Components/Sign in/Signin'
import Support from './Components/support/support'
import Users from './Components/Users/Users'

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <h1>Dashboard</h1>
          <ul className="nav-links">
            <li><Link to="/">Sign In</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/alerts">Alerts</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/devices">Devices</Link></li>
            <li><Link to="/reports">Reports</Link></li>
            <li><Link to="/security">Security</Link></li>
            <li><Link to="/sensors">Sensors</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/support">Support</Link></li>
            <li><Link to="/forgetpass">Forgot Password</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/security" element={<Security />} />
            <Route path="/sensors" element={<Sensors />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/support" element={<Support />} />
            <Route path="/forgetpass" element={<Forgetpass />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
