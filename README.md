# Crescent House Publishing - Front End

A modern Next.js front-end application for Crescent House Publishing. Browse and discover e-books with a beautiful dark-themed interface.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **React 19** - JavaScript library for building user interfaces
- **TypeScript** - Static type checking
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn UI** - High-quality React components built with Radix UI
- **Lucide React** - Beautiful icon library

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Building for Production

Create an optimized production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## Features

- 🌙 **Dark Theme** - Beautiful dark mode interface by default
- 📚 **E-book Showcase** - Grid layout displaying featured e-books
- 🎨 **Modern UI** - Built with Shadcn UI components
- 📱 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized with Next.js 16

## Project Structure

```
crescent-house-publishing-front-end/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with dark mode
│   ├── page.tsx           # Home page with e-book grid
│   └── globals.css        # Global styles and theme variables
├── components/            # React components
│   └── ui/               # Shadcn UI components
│       ├── button.tsx
│       └── card.tsx
├── lib/                  # Utility functions
│   └── utils.ts
├── public/               # Static assets
├── LICENSE               # License file
└── package.json          # Dependencies and scripts
```

## License

See LICENSE file for details.

## Contact

For licensing inquiries or permission requests, please contact Greg McKenzie.
