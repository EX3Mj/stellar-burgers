import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useSelector, useDispatch } from '../../services/store';
import { useParams } from 'react-router-dom';

import { getOrderByNumber } from '../../services/thunk/feedThunk';

type TOrderInfoProps = {
  title?: boolean;
};

export const OrderInfo: FC<TOrderInfoProps> = (props) => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const dispatch = useDispatch();
  const idOrderInfo = Number(useParams().id);

  useEffect(() => {
    dispatch(getOrderByNumber(idOrderInfo));
  }, [idOrderInfo]);

  const ingredients = useSelector((state) => state.ingredientData.ingredients);
  const orderData = useSelector((state) => state.feedData.orderByNumber);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI {...props} orderInfo={orderInfo} />;
};
