# AlgoForge 2.0 🚀

![AlgoForge Hero](https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2070&auto=format&fit=crop)

AlgoForge 2.0 is a modern, gamified platform designed to help developers master Data Structures and Algorithms (DSA). Inspired by top learning platforms, it combines a structured roadmap with engaging gamification elements like streaks, XP systems, and global leaderboards to make learning consistent and addictive.

## 🌟 Features

### 🎮 Gamified Learning
- **XP & Levels:** Earn XP for every problem solved and level up your profile.
- **Streaks:** Maintain daily activity to build discipline.
- **Badges:** Unlock achievements for milestones.

### 🗺️ Structured Roadmaps
- Curated paths for DSA topics (Arrays, Trees, Graphs, DP).
- Video solutions and practice problems for each topic.
- Progress tracking per module.

### 🏆 Dynamic Leaderboard
- Real-time global rankings.
- Filter by XP, Streak, or Problems Solved.
- See where you stand against other learners.

### 👤 Personalized Dashboard
- **Activity Graph:** Visualize your weekly coding intensity.
- **Resume Learning:** One-click access to your last studied topic.
- **Stats Overview:** Quick view of your solve count and global rank.

### 🔐 Secure Authentication
- Email/Password login.
- Google OAuth integration for one-click access.

## 🛠️ Tech Stack

### Frontend
- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** React Router

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication:** JWT (JSON Web Tokens) & Google OAuth 2.0

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas URL)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Rishabhworkspace/AlgoForge-2.0.git
    cd AlgoForge-2.0
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_client_id
    CLIENT_URL=http://localhost:5173
    ```
    Start the server:
    ```bash
    npm run dev
    ```

3.  **Setup Frontend**
    Open a new terminal and navigate to the `app` directory:
    ```bash
    cd app
    npm install
    ```
    Create a `.env` file in the `app` directory:
    ```env
    VITE_API_BASE_URL=http://localhost:5000
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    ```
    Start the client:
    ```bash
    npm run dev
    ```

4.  **Visit the App**
    Open [http://localhost:5173](http://localhost:5173) in your browser.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features or bug fixes.

## 📄 License

This project is licensed under the MIT License.
