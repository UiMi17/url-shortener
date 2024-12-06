import { useFormik } from 'formik';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Link,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../redux/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../redux/slices/authSlice'; // Для збереження токенів
import validationSchema from './validationSchema';

interface ILoginValues {
  email: string;
  password: string;
}

const initialValues: ILoginValues = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [login] = useLoginMutation(); // RTK Query для логіну
  const dispatch = useDispatch(); // Для оновлення Redux Store
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await toast.promise(
          login({
            email: values.email,
            password: values.password,
          }).unwrap(),
          {
            pending: 'Logging in...',
            success: 'Login successful!',
            error: {
              render({ data }: any) {
                return data?.data?.message || 'Login failed. Please try again.';
              },
            },
          },
        );
        await dispatch(
          setCredentials({
            accessToken: response.token,
            refreshToken: response.refreshToken,
            user: response.user,
          }),
        );

        setTimeout(() => navigate('/'), 1000);
      } catch (error) {
        toast.error('Ooops! Something went wrong.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Flex align="center" justify="center" h="100vh" bg="gray.100" p={4}>
      <Box
        width="100%"
        maxWidth="400px"
        bg="white"
        shadow="xl"
        borderRadius="lg"
        p={8}
      >
        <Heading as="h1" size="lg" mb={6} textAlign="center">
          Sign In
        </Heading>

        <form onSubmit={formik.handleSubmit}>
          <Stack gap={4}>
            <Box>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                bg="gray.50"
                size="lg"
                padding={2}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.email && formik.touched.email
                    ? 'border-red-500'
                    : ''
                }
              />
              {formik.touched.email && formik.errors.email && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.email}
                </Text>
              )}
            </Box>

            <Box>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                bg="gray.50"
                size="lg"
                padding={2}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.errors.password && formik.touched.password
                    ? 'border-red-500'
                    : ''
                }
              />
              {formik.touched.password && formik.errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.password}
                </Text>
              )}
            </Box>

            <Button
              type="submit"
              size="lg"
              w="100%"
              colorScheme="blue"
              _hover={{ transform: 'scale(1.02)' }}
              disabled={formik.isSubmitting}
            >
              Login
            </Button>
          </Stack>
        </form>

        <Text mt={6} textAlign="center" fontSize="sm">
          Don't have an account?{' '}
          <Link href="/auth/register" color="blue.500" fontWeight="bold">
            Register
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default LoginPage;
