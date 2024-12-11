import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import { getUserOrders } from '../../services/thunk/userThunk';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const { userOrders, userOrderRequest } = useSelector(
    (store) => store.userData
  );

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  if (userOrderRequest) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={userOrders} />;
};
