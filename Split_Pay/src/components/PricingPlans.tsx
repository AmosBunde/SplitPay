import React from 'react';
import { Check, CreditCard } from 'lucide-react';
import type { PricingPlan } from '../types';

const plans: PricingPlan[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    memberLimit: 2,
    monthlyFee: 9.99,
    features: [
      '2 Account Owners',
      'Basic Bill Splitting',
      'Monthly Target Setting',
      'Email Support'
    ]
  },
  {
    id: 'silver',
    name: 'Silver',
    memberLimit: 3,
    monthlyFee: 19.99,
    features: [
      '3 Account Owners',
      'Advanced Bill Splitting',
      'Monthly Target Reminders',
      'Priority Support',
      'Transaction History'
    ],
    recommended: true
  },
  {
    id: 'gold',
    name: 'Gold',
    memberLimit: 5,
    monthlyFee: 29.99,
    features: [
      '5 Account Owners',
      'Premium Bill Splitting',
      'Custom Target Settings',
      '24/7 Support',
      'Detailed Analytics',
      'Export Reports'
    ]
  },
  {
    id: 'platinum',
    name: 'Platinum',
    memberLimit: 10,
    monthlyFee: 49.99,
    features: [
      'Up to 10 Account Owners',
      'Enterprise Bill Splitting',
      'Advanced Analytics',
      'Dedicated Account Manager',
      'Custom Integration Options',
      'API Access'
    ]
  }
];

export function PricingPlans() {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select the perfect plan for your bill-splitting needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl shadow-xl overflow-hidden ${
                plan.recommended ? 'border-2 border-blue-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Recommended
                </div>
              )}
              
              <div className="bg-white p-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                  <CreditCard className={`w-8 h-8 ${
                    plan.recommended ? 'text-blue-500' : 'text-gray-400'
                  }`} />
                </div>
                
                <p className="mt-4 text-gray-500">Up to {plan.memberLimit} members</p>
                
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ${plan.monthlyFee}
                  </span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 w-full py-3 px-6 rounded-lg font-medium ${
                    plan.recommended
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}