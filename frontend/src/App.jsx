import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const queryClient = new QueryClient()

import HomePage from "./pages/HomePage";
import * as ProfilePages from './pages/Profile/index';
import * as AuthPages from './pages/auth/index';
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route index element={<HomePage />} />

            <Route path='/profile' element={
              <ProtectedRoute>
                <ProfilePages.Index />
              </ProtectedRoute>
            } />

            <Route path='/login' element={<AuthPages.Login />} />
            <Route path='/register' element={<AuthPages.Register />} />

            <Route path='/failed' element={<div>Failed Process...</div>} />
          </Routes>
        </Router>
     </QueryClientProvider>
  )
}

export default App

