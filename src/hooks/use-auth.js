import { useSelector } from 'react-redux/es/hooks/useSelector';

export function useAuth() {
  const { email, token, id, favorites, orders } = useSelector(
    (state) => state.user
  );

  return {
    isAuth: !!email,
    email,
    token,
    id,
    favorites,
    orders,
  };
}
