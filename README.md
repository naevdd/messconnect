# MessConnect Frontend

A modern React-based web application for managing student hostel (mess) operations, including student authentication, profile management, host pages, menu management, and a 3D gallery showcase.

## 🎯 Features

- **Student Authentication**: Secure login and registration system for students
- **Host Management**: Dedicated pages for hostel management and administration
- **Menu Management**: Dynamic menu creation and updates for the mess
- **Order Management**: System for managing student orders
- **Student Profiles**: Personal profile pages for students with account management
- **Gallery System**: Showcase of mess facilities with 3D scene visualization
- **Responsive Design**: Mobile-friendly interface built with Tailwind CSS
- **Material-UI Integration**: Modern UI components and styling

## 🚀 Tech Stack

- **Framework**: React 18.3.1 with Vite 5.4.10 (build tool)
- **Styling**: 
  - Tailwind CSS 4.1.8
  - Material-UI 6.1.7
  - Emotion (React CSS-in-JS)
- **Routing**: React Router DOM 6.28.1
- **HTTP Client**: Axios 1.7.9
- **3D Graphics**: Three.js 0.174.0
- **Icons**: React Icons 5.4.0, HeroIcons 2.1.5
- **Animation**: React Type Animation 3.2.0
- **Database Driver**: Mongoose 8.9.5

## 📋 Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd messfrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃 Running the Project

### Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (default Vite port).

### Production Build
Build the project for production:
```bash
npm run build
```

### Preview Build
Preview the production build locally:
```bash
npm run preview
```

### Linting
Check code quality with ESLint:
```bash
npm run lint
```

## 📁 Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Main app component
├── App.css                  # Global app styles
├── index.css                # Global styles
├── Components/
│   └── MessGalleryComp/
│       ├── MessGalleryNav.jsx    # Gallery navigation
│       └── Reviews.jsx           # Reviews component
└── pages/
    ├── HomePage.jsx              # Landing page
    ├── IndMessPage.jsx           # Individual mess details
    ├── Messform.jsx              # Mess registration form
    ├── MessGallery.jsx           # Mess gallery view
    ├── MessLogin.jsx             # Mess/Host login
    ├── StudentLogin.jsx          # Student login
    ├── StudentProfile.jsx        # Student profile page
    ├── Studentform.jsx           # Student registration form
    ├── protected.jsx             # Protected route wrapper
    ├── protected2.jsx            # Additional protected route
    ├── ThreeScene.jsx            # 3D gallery scene
    └── HostPages/
        ├── HostPage.jsx          # Host dashboard
        ├── HostProfile.jsx       # Host profile
        ├── MenuPage.jsx          # Menu management
        └── Orders.jsx            # Order management

public/                     # Static assets
assets/                     # Images, icons, and media files
```

## 🔐 Authentication

The application supports two types of authentication:
- **Student Login**: For individual students to access their profiles and features
- **Mess/Host Login**: For hostel administrators to manage operations

Protected routes are implemented to restrict access based on user type.

## 🎨 Styling

The project uses a combination of:
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Material-UI**: Pre-built components and theming system
- **Emotion**: CSS-in-JS solution for dynamic styling

## 🌐 Deployment

The application is configured for deployment on Render. The Vite preview server is configured to run on:
- **Host**: 0.0.0.0 (accept external connections)
- **Port**: Environment variable `PORT` (default 4173)
- **Allowed Hosts**: messconnect.onrender.com

To deploy, use:
```bash
npm start
```

## 📦 Build Output

The production build is output to the `dist/` directory after running `npm run build`.

## 🛠️ Development

### Code Quality
The project uses ESLint for code linting with React-specific rules:
- ESLint 9.13.0
- React plugin 7.37.2
- React Hooks plugin 5.0.0

Run linting with:
```bash
npm run lint
```

## 🔗 Related Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Three.js Documentation](https://threejs.org)

## 📝 License

[Add your license information here]

## 👥 Contributing

[Add contribution guidelines here]

## 📧 Support

[Add support contact information here]