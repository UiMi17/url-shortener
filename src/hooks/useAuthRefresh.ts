import { useDispatch, useSelector } from 'react-redux';
import { useRefreshMutation } from '@/redux/api/authApi';
import { selectRefreshToken } from '@/redux/selectors';
import { setCredentials } from '@/redux/slices/authSlice';

const useAuthRefresh = () => {
  const [refresh] = useRefreshMutation();
  const dispatch = useDispatch();
  const refreshToken = useSelector(selectRefreshToken);

  const refreshAuthToken = async () => {
    if (!refreshToken) return;

    try {
      const response = await refresh(refreshToken).unwrap();
      dispatch(setCredentials(response));
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  };

  return refreshAuthToken;
};

export default useAuthRefresh;
