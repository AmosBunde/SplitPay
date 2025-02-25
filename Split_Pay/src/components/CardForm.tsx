import React, { useState } from 'react';
import { CreditCard, Loader2, Plus, Users } from 'lucide-react';
import { generateVirtualCardNumber } from '../lib/utils';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export function CardForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [memberLimit, setMemberLimit] = useState(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const cardNumber = generateVirtualCardNumber();
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);

      const { data: user } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase.from('virtual_cards').insert({
        cardNumber,
        expiryDate: expiryDate.toISOString(),
        createdBy: user.id,
        status: 'active',
        memberLimit,
      });

      if (error) throw error;
      toast.success('Virtual card created successfully!');
    } catch (error) {
      toast.error('Failed to create virtual card');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-4 mb-6">
          <CreditCard className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Create Virtual Card</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Users className="w-4 h-4" />
              Member Limit
            </label>
            <input
              type="number"
              min={2}
              max={5}
              value={memberLimit}
              onChange={(e) => setMemberLimit(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            Create Card
          </button>
        </div>
      </div>
    </form>
  );
}