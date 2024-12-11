import {
  ConstructorPage,
  Feed,
  Login,
  Profile,
  ProfileOrders,
  ForgotPassword,
  Register,
  ResetPassword,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { getAllIngredients } from '../../services/thunk/ingredientThunk';
import { getUser } from '../../services/thunk/userThunk';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const goBack = () => navigate(-1);

  useEffect(() => {
    dispatch(getAllIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/ingredients/:id' element={<IngredientDetails title />} />
        <Route path='/feed/:id' element={<OrderInfo title />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                children={<IngredientDetails />}
                title='Детали ингредиента'
                onClose={goBack}
              />
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal
                children={<OrderInfo />}
                title={`#${location.pathname.split('/')[2]}`}
                onClose={goBack}
              />
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <ProtectedRoute>
                <Modal
                  children={<OrderInfo />}
                  title={`#${location.pathname.split('/')[3]}`}
                  onClose={goBack}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
