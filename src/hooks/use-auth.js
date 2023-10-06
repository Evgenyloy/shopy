import { useSelector } from 'react-redux/es/hooks/useSelector';

export function useAuth() {
  const { user, favorites, orders } = useSelector((state) => state.user);

  return {
    isAuth: !!user,
    favorites,
    orders,
    user,
  };
}
