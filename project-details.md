# Inventory Management System - Frontend

## Project Overview
This is a modern web-based Inventory Management System built with Next.js 15.3.2 and React 19. The application provides a comprehensive solution for managing inventory, products, orders, and sales with a beautiful and responsive user interface.

## Tech Stack
- **Framework**: Next.js 15.3.2
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **Type Safety**: TypeScript
- **UI Components**: 
  - Radix UI (Alert Dialog, Label, Slot, Toast)
  - Custom UI components with Tailwind
- **Animation**: tw-animate-css
- **Notifications**: Sonner

## Project Structure
```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication related pages
│   ├── dashboard/         # Dashboard pages
│   ├── orders/           # Order management pages
│   ├── products/         # Product management pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/            # Reusable components
│   ├── dashboard/        # Dashboard specific components
│   ├── inventory/        # Inventory management components
│   ├── layout/          # Layout components
│   ├── sales/           # Sales related components
│   ├── shared/          # Shared/common components
│   └── ui/              # UI components
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
├── types/               # TypeScript type definitions
└── [config files]       # Various configuration files
```

## Key Features
1. **Authentication System**
   - Secure user authentication
   - Protected routes

2. **Dashboard**
   - Overview of key metrics
   - Quick access to important features

3. **Product Management**
   - Product listing
   - Add/Edit/Delete products
   - Product details view

4. **Order Management**
   - Order tracking
   - Order processing
   - Order history

5. **Inventory Management**
   - Stock tracking
   - Inventory updates
   - Low stock alerts

6. **Sales Management**
   - Sales tracking
   - Sales reports
   - Revenue analytics

## Development Setup
1. **Prerequisites**
   - Node.js
   - npm or yarn

2. **Installation**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Running the Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Building for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Starting Production Server**
   ```bash
   npm run start
   # or
   yarn start
   ```

## Available Scripts
- `dev`: Starts the development server
- `build`: Creates a production build
- `start`: Runs the production server
- `lint`: Runs the linter

## Dependencies
### Main Dependencies
- @radix-ui/react-alert-dialog: ^1.1.14
- @radix-ui/react-label: ^2.1.7
- @radix-ui/react-slot: ^1.2.3
- @radix-ui/react-toast: ^1.2.14
- class-variance-authority: ^0.7.1
- clsx: ^2.1.1
- lucide-react: ^0.511.0
- next: 15.3.2
- react: ^19.0.0
- react-dom: ^19.0.0
- sonner: ^2.0.3
- tailwind-merge: ^3.3.0

### Development Dependencies
- @tailwindcss/postcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- tailwindcss: ^4
- tw-animate-css: ^1.3.0
- typescript: ^5

## Best Practices
1. **Code Organization**
   - Components are organized by feature/domain
   - Shared components are separated
   - TypeScript for type safety

2. **UI/UX**
   - Responsive design
   - Modern UI components
   - Toast notifications for user feedback
   - Alert dialogs for important actions

3. **Performance**
   - Next.js for optimized performance
   - Component-based architecture
   - Efficient state management

## Future Improvements
1. Add more comprehensive error handling
2. Implement advanced search and filtering
3. Add data visualization for analytics
4. Implement real-time updates
5. Add user roles and permissions
6. Implement export functionality for reports 