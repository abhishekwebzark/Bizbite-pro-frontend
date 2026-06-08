"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/slices/store";

// Note: CartProvider is only used inside store/* pages via store/layout.jsx
// This providers.jsx wraps the entire app with Redux only

export default function Providers({ children }) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
}