# CollabMatch — Find Your Project Collaborator

CollabMatch is a Tinder-like matchmaking web application designed specifically for university students to find project partners, hackathon teammates, research co-authors, startup co-founders, and open-source contributors. It features a swipe-based dashboard where users can explore student profiles, match based on mutual interest, and build the next big thing together.

---

## Key Features

*   **Tinder-style Swiping Dashboard:** Easily review student cards showing names, majors, universities, bio descriptions, skill tags, and target project interests. Swipe right (or click Like) to connect, swipe left (or click Pass) to skip, or Superlike to stand out.
*   **Onboarding & Profile Setup:** A step-by-step profile creation form allowing users to select their university, year of study, major, skillsets, and exact collaboration goals.
*   **Matches Hub:** A dedicated tab that lists mutual matches. View matched students' details, their primary skillsets, and target collaboration areas to start communicating.
*   **Smart Filtering:** Instantly filter candidate stacks by target collaboration type (e.g., Hackathons, Startups, Research, Open Source) or specific skills to find the exact profile you need.
*   **Netlify Serverless Backend:** Integrated serverless edge endpoints handle backend operations like profile storage and matchmaking evaluations.
*   **Sleek Responsive UI:** Clean layouts built with custom CSS animations, color-coded avatars, hover states, and smooth card transitions.

---

## Technology Stack

*   **Frontend Language:** TypeScript (strict type checking compiled to ES2020)
*   **Structure & Styling:** Semantic HTML5, Vanilla CSS3 (custom layouts, flexbox/grid, and transition systems)
*   **Backend Functions:** Netlify Functions (written in TypeScript/ES Modules `.mts`)
*   **Dev & Build Tooling:** TypeScript Compiler (`tsc`)
*   **Deployment platform:** Netlify (configured via `netlify.toml`)

---

## Project Structure

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

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16.x or higher recommended)
*   npm (v8.x or higher)

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
    Since this project uses serverless Netlify Functions, it is highly recommended to run it using the [Netlify CLI](https://docs.netlify.com/cli/get-started/) to test API endpoints locally:
    *   Install Netlify CLI: `npm install -g netlify-cli`
    *   Start local server: `netlify dev`
    *   Your app will be served locally at `http://localhost:8888` (with functions proxying to `http://localhost:8888/.netlify/functions/...`).

5.  **Build for Production:**
    To bundle the static files and compile TypeScript into the `dist/` directory:
    ```bash
    npm run build
    ```

---

## Netlify Deployment

This project is optimized for zero-configuration Netlify deployment:
1.  Connect your GitHub repository to Netlify.
2.  Set the build settings (which Netlify will automatically detect from `netlify.toml`):
    *   **Build Command:** `npm run build`
    *   **Publish Directory:** `dist`
    *   **Functions Directory:** `netlify/functions`
3.  Deploy! Netlify will compile your TypeScript frontend, package your serverless functions, and serve your app globally.
