import {
  useGetUrlsQuery,
  useAddUrlMutation,
  useLazyGetUserByIdQuery,
  useDeleteUrlMutation,
} from '../redux/api/urlApi';
import {
  Box,
  Table,
  Button,
  Input,
  VStack,
  HStack,
  TableColumnHeader,
  Spinner,
  Text,
  Link,
} from '@chakra-ui/react';
import { IUrlData } from '@/types/urlTypes';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/selectors';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UrlPage = () => {
  const { data: urls, isLoading, isError, refetch } = useGetUrlsQuery({});
  const [addUrl, { isLoading: isAdding }] = useAddUrlMutation();
  const [deleteUrl, { isLoading: isDeleting }] = useDeleteUrlMutation();
  const [getUserById] = useLazyGetUserByIdQuery();
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const isAuthorized = !!currentUser;
  const isAdminUser = currentUser?.role === 'Admin';

  const [originalUrl, setOriginalUrl] = useState('');
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  const handleShortenUrl = async () => {
    if (!originalUrl) {
      toast.error('Please enter a valid URL.');
      return;
    }

    try {
      await toast.promise(addUrl({ originalUrl }).unwrap(), {
        pending: 'Shortening URL...',
        success: 'URL shortened successfully!',
        error: 'Failed to shorten URL. Please try again.',
      });

      setOriginalUrl('');
      refetch();
    } catch (error) {
      console.error('Error shortening URL:', error);
    }
  };

  useEffect(() => {
    const fetchUserNames = async () => {
      if (urls) {
        const userMap: { [key: string]: string } = {};
        for (const url of urls) {
          if (!url.createdBy) continue;
          if (!userMap[url.createdBy]) {
            try {
              const user = await getUserById(url.createdBy).unwrap();
              userMap[url.createdBy] = user.username || `User ${url.createdBy}`;
            } catch (error) {
              console.error(`Failed to fetch user ${url.createdBy}:`, error);
              userMap[url.createdBy] = 'Unknown User';
            }
          }
        }
        setUserNames(userMap);
      }
    };

    fetchUserNames();
  }, [urls, getUserById]);

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Spinner size="xl" />
        <Text mt={2}>Loading URLs...</Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4} textAlign="center">
        <Text color="red.500">
          Failed to load URLs. Please try again later.
        </Text>
      </Box>
    );
  }

  const handleUrlDelete = async (urlId: string) => {
    await deleteUrl(urlId);
    refetch();
  };

  return (
    <Box p={4} borderRadius="lg" shadow="md" className="bg-white">
      {isAuthorized && (
        <VStack gap={4} mb={6} align="stretch">
          <Input
            placeholder="Enter URL"
            variant="outline"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="p-2"
          />
          <Button
            colorScheme="blue"
            onClick={handleShortenUrl}
            disabled={isAdding}
          >
            Shorten URL
          </Button>
        </VStack>
      )}

      <Table.Root variant="line" size="md" borderWidth="1px" interactive>
        <Table.Header>
          <Table.Row>
            <TableColumnHeader>Original URL</TableColumnHeader>
            <TableColumnHeader>Short URL</TableColumnHeader>
            <TableColumnHeader>Created By</TableColumnHeader>
            {isAuthorized && <TableColumnHeader>Actions</TableColumnHeader>}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {urls?.map((url: IUrlData) => (
            <Table.Row key={url.id}>
              <Table.Cell>
                <Link href={url.originalUrl}>{url.originalUrl}</Link>
              </Table.Cell>
              <Table.Cell>
                <Link
                  href={`http://localhost:5024/api/url/${url.shortenedUrl}`}
                >
                  {`http://localhost:5024/api/url/${url.shortenedUrl}`}
                </Link>
              </Table.Cell>
              <Table.Cell>
                {userNames[url.createdBy] || 'Loading...'}
              </Table.Cell>
              <Table.Cell>
                <HStack gap={2}>
                  {(parseInt(url.createdBy) === currentUser?.id ||
                    isAdminUser) && (
                    <Button
                      onClick={() => handleUrlDelete(String(url.id))}
                      colorScheme="red"
                      size="sm"
                      disabled={isDeleting}
                    >
                      Delete
                    </Button>
                  )}
                  {isAuthorized && (
                    <Button
                      onClick={() => navigate('/url/info')}
                      colorScheme="teal"
                      size="sm"
                    >
                      Details
                    </Button>
                  )}
                </HStack>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default UrlPage;
