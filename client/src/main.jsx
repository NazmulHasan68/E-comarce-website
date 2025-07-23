// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from "react-redux";
import { appStore, persistor } from './redux/store';
import { useLoadUserQuery } from './redux/ApiController/authApi';
import { PersistGate } from 'redux-persist/integration/react';
import { ClipLoader } from "react-spinners";

const Custom = ({ children }) => {
  const { isLoading } = useLoadUserQuery();

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <ClipLoader size={30} color="#4A90E2" />;
          <p className="mt-1 text-3xl text-sky-600">Shadow it</p>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={appStore}>
      <Custom>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Custom>
    </Provider>
  </StrictMode>,
);
