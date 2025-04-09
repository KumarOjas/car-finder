# Car Finder Application

A React application for browsing and saving car listings to a wishlist.

## Features
- Browse car listings with images
- Add/remove cars to wishlist
- Search and filter functionality
- Responsive design
- Dark/light theme toggle

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/yourusername/car-finder.git
cd car-finder
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open in browser:
```
http://localhost:3000
```

### Environment Variables
No environment variables required for basic setup.

### Available Scripts
- `npm start`: Runs the app in development mode
- `npm test`: Launches the test runner
- `npm run build`: Builds the app for production
- `npm run eject`: Ejects from create-react-app

## Project Structure
```
car-finder/
├── public/            # Static files
├── src/
│   ├── components/    # Reusable components
│   ├── context/       # React context providers
│   ├── pages/         # Page components
│   ├── utils/         # Utility functions and mock data
│   ├── App.js         # Main application component
│   └── index.js       # Application entry point
├── package.json
└── README.md
```

## Troubleshooting
- If images don't load:
  - Check browser console for errors
  - Verify image URLs in `src/utils/mockCars.js`
  - Ensure no ad-blockers are interfering

## License
MIT
