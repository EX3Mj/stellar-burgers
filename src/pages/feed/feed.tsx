import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC } from 'react';
import { getFeed } from '../../services/thunk/feedThunk';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { orders, isLoading } = useSelector((store) => store.feedData);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeed());
  }, []);

  if (isLoading || orders.length === 0) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(getFeed());
      }}
    />
  );
};
