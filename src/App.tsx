import { Route, Routes } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import UrlPage from './pages/UrlPage';
import UrlInfoPage from './pages/UrlInfoPage';
import AboutPage from './pages/AboutPage';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <div className="h-full">
      <Routes>
        <Route
          index
          element={
            <Layout>
              <UrlPage />
            </Layout>
          }
        />
        <Route
          path="about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="url/info"
          element={
            <Layout>
              <UrlInfoPage />
            </Layout>
          }
        />
        <Route path="auth/register" element={<RegisterPage />} />
        <Route path="auth/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
