# CollabMatch — Find Your Project Collaborator

![Status](https://img.shields.io/badge/status-active-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

**[🚀 Try CollabMatch Live](https://projec-tmatch.netlify.app)** | **[Report Bug](https://github.com/Sweta113Sharma/projec-tmatch/issues)** | **[Request Feature](https://github.com/Sweta113Sharma/projec-tmatch/issues)**

CollabMatch is a Tinder-like matchmaking web application designed specifically for university students to find project partners, hackathon teammates, research co-authors, startup co-founders, and open-source collaborators. Built with TypeScript and Netlify serverless functions for seamless collaboration discovery.

---

## 📋 Table of Contents

- [🌟 Key Features](#-key-features)
- [🛠️ Technology Stack](#%EF%B8%8F-technology-stack)
- [📂 Project Structure](#-project-structure)
- [⚡ Getting Started](#-getting-started)
- [🔌 API Endpoints](#-api-endpoints)
- [📸 Demo & Screenshots](#-demo--screenshots)
- [🌐 Netlify Deployment](#-netlify-deployment)
- [❓ Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [💬 Support](#-support)
- [📄 License](#-license)

---

## 🌟 Key Features

*   **Tinder-style Swiping Dashboard:** Easily review student cards showing names, majors, universities, bio descriptions, skill tags, and target project interests. Swipe right (or click Like) to connect with potential collaborators and build your network.
*   **Onboarding & Profile Setup:** A step-by-step profile creation form allowing users to select their university, year of study, major, skillsets, and exact collaboration goals (hackathons, startups, research, open-source).
*   **Matches Hub:** A dedicated tab that lists mutual matches. View matched students' details, their primary skillsets, and target collaboration areas to start communicating.
*   **Smart Filtering:** Instantly filter candidate stacks by target collaboration type (e.g., Hackathons, Startups, Research, Open Source) or specific skills to find the exact profile you need.
*   **Netlify Serverless Backend:** Integrated serverless edge endpoints handle backend operations like profile storage and matchmaking evaluations with zero server overhead.
*   **Sleek Responsive UI:** Clean layouts built with custom CSS animations, color-coded avatars, hover states, and smooth card transitions for an engaging user experience.

---

## 🛠️ Technology Stack

*   **Frontend Language:** TypeScript (strict type checking compiled to ES2020)
*   **Structure & Styling:** Semantic HTML5, Vanilla CSS3 (custom layouts, flexbox/grid, and transition systems)
*   **Backend Functions:** Netlify Functions (written in TypeScript/ES Modules `.mts`)
*   **Dev & Build Tooling:** TypeScript Compiler (`tsc`)
*   **Deployment Platform:** Netlify (configured via `netlify.toml`)
*   **Package Manager:** npm

---

## 📂 Project Structure

```text
projec-tmatch/
├── netlify/
│   └── functions/          # Serverless Edge APIs
│       ├── matches.mts     # GET matches for user & POST new matchmaking events
│       └── profiles.mts    # GET filtered student list & POST user registration
├── src/
│   └── app.ts              # Core TypeScript application logic & state controller
├── dist/                   # Compiled outputs and production build folder
├── index.html              # Main Single-Page Application (SPA) structure
├── styles.css              # Custom styling sheet (layouts, card swipes, animations)
├── tsconfig.json           # TypeScript compilation configurations
├── netlify.toml            # Netlify deployment and build specifications
├── package.json            # Node project configuration and package dependencies
└── README.md               # Project documentation
```

---

## ⚡ Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16.x or higher recommended)
*   npm (v8.x or higher)
*   [Netlify CLI](https://docs.netlify.com/cli/get-started/) (optional but recommended for local testing)

### Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/Sweta113Sharma/projec-tmatch.git
    cd projec-tmatch
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Run Compilation in Development Mode:**
    To compile TypeScript changes automatically on save:
    ```bash
    npm run dev
    ```

4.  **Local Server Testing:**
    Since this project uses serverless Netlify Functions, it is highly recommended to run it using the Netlify CLI to test API endpoints locally:
    ```bash
    # Install Netlify CLI (if not already installed)
    npm install -g netlify-cli
    
    # Start local development server
    netlify dev
    ```
    Your app will be served locally at `http://localhost:8888` (with functions proxying to `http://localhost:8888/.netlify/functions/...`).

5.  **Build for Production:**
    To bundle the static files and compile TypeScript into the `dist/` directory:
    ```bash
    npm run build
    ```

---

## 🔌 API Endpoints

### Profiles Function
**File:** `netlify/functions/profiles.mts`

#### GET /profiles
Retrieve filtered list of student profiles.
```
GET /.netlify/functions/profiles?university=MIT&skills=React,Node.js
```

#### POST /profiles
Register or update user profile.
```json
{
  "name": "John Doe",
  "university": "MIT",
  "major": "Computer Science",
  "year": "Junior",
  "skills": ["React", "Node.js", "TypeScript"],
  "collaborationTypes": ["Hackathons", "Startups"],
  "bio": "Passionate about building scalable web applications"
}
```

### Matches Function
**File:** `netlify/functions/matches.mts`

#### GET /matches
Returns mutual matches for a specific user.
```
GET /.netlify/functions/matches?userId=user123
```

#### POST /matches
Record a matchmaking event (like/pass).
```json
{
  "userId": "user123",
  "targetUserId": "user456",
  "action": "like"
}
```

---

## 📸 Demo & Screenshots

### Swiping Dashboard
Swipe through student profiles with detailed information and seamless interactions.

### Matches Hub
View all your mutual matches and start collaborating.

### Profile Setup
Create a comprehensive profile highlighting your skills and collaboration goals.

---

## 🌐 Netlify Deployment

This project is optimized for zero-configuration Netlify deployment:

1.  **Connect your GitHub repository to Netlify:**
    - Go to [Netlify](https://app.netlify.com)
    - Click "New site from Git"
    - Select your repository

2.  **Netlify will automatically detect build settings from `netlify.toml`:**
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `dist`
    *   **Functions Directory:** `netlify/functions`

3.  **Deploy!** Netlify will compile your TypeScript frontend, package your serverless functions, and serve your app globally.

---

## ❓ Troubleshooting

### Port 8888 Already in Use
If port 8888 is already occupied, specify a different port:
```bash
netlify dev -p 3000
```

### TypeScript Compilation Errors
Clear the cache and reinstall dependencies:
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Netlify Functions Not Working Locally
Ensure you have the latest Netlify CLI:
```bash
npm install -g netlify-cli@latest
```
Then restart the dev server:
```bash
netlify dev
```

### Hot Module Reloading Issues
Try clearing your browser cache or opening the app in an incognito/private window:
```bash
npm run dev
```

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/projec-tmatch.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes and commit**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open a Pull Request**
   Describe your changes clearly in the PR description.

---

## 💬 Support

Have questions or found an issue? Here are ways to get help:

- **[Open a GitHub Issue](https://github.com/Sweta113Sharma/projec-tmatch/issues)** - For bug reports or feature requests
- **[Discussions](https://github.com/Sweta113Sharma/projec-tmatch/discussions)** - For questions and ideas
- **Email:** For direct inquiries, reach out through GitHub Issues

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```

---

**Made with ❤️ for university students everywhere**
