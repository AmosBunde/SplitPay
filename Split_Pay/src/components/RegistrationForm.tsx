import React, { useState } from 'react';
import { User, Shield, Plane } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function RegistrationForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    identificationType: 'nationalId',
    identificationNumber: '',
    isAirportPickup: false,
    airportPickupLocation: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      });

      if (authError) throw authError;

      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user?.id,
        name: formData.name,
        phone: formData.phone,
        identificationType: formData.identificationType,
        identificationNumber: formData.identificationNumber,
        isAirportPickup: formData.isAirportPickup,
        airportPickupLocation: formData.isAirportPickup ? formData.airportPickupLocation : null
      });

      if (profileError) throw profileError;

      toast.success('Registration successful!');
      if (formData.isAirportPickup) {
        toast.success('Your card will be available for pickup at the selected airport location');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <User className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-semibold">Register Account</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Identification Type</label>
          <select
            value={formData.identificationType}
            onChange={(e) => setFormData({ ...formData, identificationType: e.target.value as 'nationalId' | 'passport' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="nationalId">National ID</option>
            <option value="passport">Passport</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            {formData.identificationType === 'nationalId' ? 'National ID Number' : 'Passport Number'}
          </label>
          <input
            type="text"
            required
            value={formData.identificationNumber}
            onChange={(e) => setFormData({ ...formData, identificationNumber: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="airportPickup"
            checked={formData.isAirportPickup}
            onChange={(e) => setFormData({ ...formData, isAirportPickup: e.target.checked })}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="airportPickup" className="ml-2 block text-sm text-gray-700">
            I need airport pickup for my card
          </label>
        </div>

        {formData.isAirportPickup && (
          <div>
            <label className="block text-sm font-medium text-gray-700">Airport Location</label>
            <select
              value={formData.airportPickupLocation}
              onChange={(e) => setFormData({ ...formData, airportPickupLocation: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Airport</option>
              <option value="JKIA">Jomo Kenyatta International Airport</option>
              <option value="MIA">Moi International Airport</option>
              <option value="EIA">Eldoret International Airport</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⌛</span>
              Processing...
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              Register
            </>
          )}
        </button>
      </form>
    </div>
  );
}