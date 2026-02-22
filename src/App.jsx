import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
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
import Settings from './Components/Settings/Settings'
import Signin from './Components/Sign in/Signin'
import Support from './Components/support/support'
import Users from './Components/Users/Users'
import TopNavigationBar from './Common/TopNavigationBar'
import Footer from './Common/Footer'

function Layout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/' || location.pathname === '/forgetpass';

  return (
    <div className="app-container">
      {!isAuthPage && <TopNavigationBar />}
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
      {!isAuthPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App
