# BizBiteNow Frontend

BizBiteNow is a modern business listing and lead generation platform built with Next.js. This frontend application provides a responsive and user-friendly interface for managing businesses, generating leads, and interacting with platform features.

## 🚀 Tech Stack

- Next.js 16
- React 19
- Redux Toolkit
- React Redux
- Axios
- React Hook Form
- Zod Validation
- React Hot Toast
- React Icons
- Tailwind CSS 4

---

## 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
cd bizbitenow-frontend
```

Install dependencies:

```bash
npm install
```

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory and add the required environment variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Update the API URL according to your backend environment.

---

## ▶️ Running the Project

Start the development server:

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## 🏗️ Build for Production

Generate a production build:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

## 📁 Project Structure

```text
bizbitenow-frontend/
│
├── public/
├── src/
│   ├── app/
│   ├── components/
│   ├── redux/
│   ├── services/
│   ├── hooks/
│   ├── utils/
│   └── validations/
│
├── .env.local
├── package.json
└── README.md
```

---

## ✨ Features

- User Authentication
- Business Management
- Lead Generation System
- Form Validation with Zod
- Redux State Management
- Responsive UI
- API Integration using Axios
- Toast Notifications
- Modern Next.js App Router

---

## 🛠 Available Scripts

```bash
npm run dev
```
Runs the application in development mode.

```bash
npm run build
```
Creates an optimized production build.

```bash
npm run start
```
Starts the production server.

```bash
npm run lint
```
Runs ESLint for code quality checks.

---

## 📌 Development Guidelines

- Follow component-based architecture.
- Use Redux Toolkit for global state management.
- Use React Hook Form and Zod for form handling and validation.
- Keep API services separated inside the services directory.
- Maintain reusable UI components inside the components directory.

---

## 👨‍💻 Developer

**Abhishek Mishra**

Frontend Developer

---

## 📄 License

This project is private and intended for internal development and deployment purposes only.