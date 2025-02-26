# SplitPay - Virtual Card Bill Splitting App

SplitPay is a modern web application that simplifies bill splitting by creating virtual cards that can be shared among group members. When the bill arrives, everyone in the group is prompted to contribute their share before the payment can be processed.

![SplitPay Screenshot](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200)

## Features

- 🎯 Flexible pricing plans (Bronze, Silver, Gold, Platinum)
- 💳 Secure virtual card generation
- 👥 Member management (2-10 members based on plan)
- 💰 Automated bill splitting
- 🎯 Monthly target setting and reminders
- 🛂 Secure registration with ID/Passport verification
- ✈️ Airport card pickup for tourists
- 🔒 Row-level security with Supabase
- ⚡ Real-time updates
- 📱 Responsive design

## Pricing Plans

- **Bronze Plan**
  - 2 Account owners
  - Basic features
  - $9.99/month

- **Silver Plan**
  - 3 Account owners
  - Advanced features
  - Priority support
  - $19.99/month

- **Gold Plan**
  - 5 Account owners
  - Premium features
  - 24/7 support
  - $29.99/month

- **Platinum Plan**
  - Above 5 owners (up to 10)
  - Enterprise features
  - Dedicated support
  - $49.99/month

## Registration Requirements

### Kenyan Citizens
- Full Name
- Email Address
- Phone Number
- National ID Number

### Tourists
- Full Name
- Email Address
- Phone Number
- Passport Number
- Airport Pickup Location
  - JKIA (Jomo Kenyatta International Airport)
  - MIA (Moi International Airport)
  - EIA (Eldoret International Airport)

## Tech Stack

- **Frontend**:
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide Icons
  - React Router DOM
  - React Hot Toast

- **Backend**:
  - Supabase (PostgreSQL)
  - Row Level Security
  - Real-time subscriptions

- **Development**:
  - Vite
  - ESLint
  - PostCSS
  - TypeScript

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/splitpay.git
   cd splitpay
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Database Setup

The application uses Supabase as its database. The schema includes:

- `users`: User profiles with identification details
- `virtual_cards`: Virtual card information with plan types
- `card_members`: Membership relationships
- `transactions`: Transaction records
- `payments`: Payment tracking

Database migrations are located in `supabase/migrations/`.

## Security

- Row Level Security (RLS) policies ensure data access control
- Secure virtual card number generation
- Authentication handled by Supabase
- Protected API endpoints
- Secure ID/Passport verification

## Project Structure

```
splitpay/
├── src/
│   ├── components/      # React components
│   │   ├── PricingPlans.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── ...
│   ├── lib/            # Utilities and helpers
│   ├── types/          # TypeScript definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── supabase/
│   └── migrations/     # Database migrations
├── public/             # Static assets
└── package.json        # Project dependencies
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
