import React, { useEffect, useState } from 'react';
import { CreditCard, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { VirtualCard } from '../types';
import { formatCurrency } from '../lib/utils';

export function CardList() {
  const [cards, setCards] = useState<VirtualCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCards() {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from('virtual_cards')
          .select('*')
          .eq('createdBy', user.id)
          .order('createdAt', { ascending: false });

        if (error) throw error;
        setCards(data || []);
      } catch (error) {
        console.error('Error loading cards:', error);
      } finally {
        setLoading(false);
      }
    }

    loadCards();
  }, []);

  if (loading) {
    return <div className="text-center">Loading cards...</div>;
  }

  if (cards.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No virtual cards found. Create one to get started!
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <span className={`px-2 py-1 rounded text-sm ${
              card.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {card.status}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-lg font-mono">
              •••• •••• •••• {card.cardNumber.slice(-4)}
            </p>
            <p className="text-sm text-gray-600">
              Expires: {new Date(card.expiryDate).toLocaleDateString()}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="w-4 h-4" />
              <span>{card.memberLimit} members max</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}