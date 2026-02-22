import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'

// Import all components
import Dashboard from './Components/Dashboard/Dashboard'
import Alerts from './Components/Alerts/Alerts'
import { AnalyticsScreen as Analytics } from './Components/Analytics/Analytics/Analytics'
import Devices from './Components/Devices/Devices'
import Forgetpass from './Components/Forgetpass/Forgetpass'
import Reports from './Components/Reports/Reports'
import Security from './Components/Security/Security'
import Sensors from './Components/Sensors/Sensors'
import Settings from './Components/Settings/Settings'
import Signin from './Components/Sign in/Signin'
import Support from './Components/support/support'
import Users from './Components/Users/Users'
import ProfessionalNavbar from './Components/Navbar/ProfessionalNavbar'
import Footer from './Common/Footer'

function AppContent() {
  const location = useLocation()
  const isSigninPage = location.pathname === '/'
  const isForgetpassPage = location.pathname === '/forgetpass'
  const isAuthPage = isSigninPage || isForgetpassPage

  return (
    <div className="app-container">
      {!isAuthPage && <ProfessionalNavbar />}

      <main className={`main-content ${!isAuthPage ? 'with-navbar' : ''}`}>
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
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
