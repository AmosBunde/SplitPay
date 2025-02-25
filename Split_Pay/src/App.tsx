import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CardForm } from './components/CardForm';
import { CardList } from './components/CardList';
import { PricingPlans } from './components/PricingPlans';
import { RegistrationForm } from './components/RegistrationForm';
import { CreditCard, Users } from 'lucide-react';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <CreditCard className="w-8 h-8 text-blue-600" />
                <span className="ml-2 text-xl font-semibold">SplitPay</span>
              </div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
                  <Users className="w-5 h-5 mr-2" />
                  Account
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<PricingPlans />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route
              path="/dashboard"
              element={
                <div className="space-y-8">
                  <CardForm />
                  <div className="border-t pt-8">
                    <h2 className="text-2xl font-semibold mb-6">Your Virtual Cards</h2>
                    <CardList />
                  </div>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;