import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

type TIngredientInfoProps = {
  title?: boolean;
};

export const IngredientDetails: FC<TIngredientInfoProps> = (props) => {
  const { id } = useParams();
  /** TODO: взять переменную из стора */
  const ingredients = useSelector((state) => state.ingredientData.ingredients);
  const ingredientDetailData =
    ingredients.find((item) => item._id === id) || null;

  if (!ingredientDetailData) {
    return <Preloader />;
  }

  return (
    <IngredientDetailsUI {...props} ingredientData={ingredientDetailData} />
  );
};
