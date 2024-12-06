import { useFormik } from 'formik';
import { useRegisterMutation } from '../../redux/api/authApi';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { toast } from 'react-toastify';
import validationSchema from './validationSchema';

const RegisterPage = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);
        await toast.promise(
          register({
            username: values.username,
            email: values.email,
            password: values.password,
          }).unwrap(),
          {
            pending: 'Registration in progress...',
            success: {
              render() {
                setTimeout(() => navigate('/auth/login'), 1000);
                return 'Registration successful!';
              },
            },
            error: {
              render({ data }: any) {
                return data?.data?.message || 'Registration failed.';
              },
            },
          },
        );
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
          Sign Up
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <Stack gap={4}>
            <Box>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                bg="gray.50"
                size="lg"
                padding={2}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.username}
                </Text>
              )}
            </Box>
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
              />
              {formik.touched.password && formik.errors.password && (
                <Text color="red.500" fontSize="sm" mt={1}>
                  {formik.errors.password}
                </Text>
              )}
            </Box>

            <Box>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                bg="gray.50"
                size="lg"
                padding={2}
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <Text color="red.500" fontSize="sm" mt={1}>
                    {formik.errors.confirmPassword}
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
              Register
            </Button>
          </Stack>
        </form>

        <Text mt={6} textAlign="center" fontSize="sm">
          Already have an account?{' '}
          <Link href="/auth/login" color="blue.500" fontWeight="bold">
            Log in
          </Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default RegisterPage;
