import { IUrlData } from '@/types/urlTypes';
import { Box, Heading, Text, Flex, Badge, Stack } from '@chakra-ui/react';

const UrlInfo = ({ urlData }: { urlData: IUrlData }) => {
  return (
    <Flex justify="center" align="center" className="p-6 bg-gray-100">
      <Box
        className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6 border"
        borderColor="gray.200"
      >
        <Heading as="h1" size="lg" className="text-center text-gray-800 mb-4">
          Short URL Details
        </Heading>
        <Stack gap={4}>
          <Box>
            <Text fontWeight="bold" className="text-gray-700">
              Original URL:
            </Text>
            <Text
              className="text-blue-600 underline cursor-pointer"
              onClick={() => window.open(urlData.originalUrl, '_blank')}
            >
              {urlData.originalUrl}
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" className="text-gray-700">
              Short URL:
            </Text>
            <Text
              className="text-blue-500 font-medium underline cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(urlData.shortenedUrl)
              }
            >
              {urlData.shortenedUrl} (Click to Copy)
            </Text>
          </Box>
          <Box>
            <Text fontWeight="bold" className="text-gray-700">
              Created By:
            </Text>
            <Badge
              colorScheme="purple"
              className="text-sm font-semibold px-2 py-1 rounded"
            >
              {urlData.createdBy}
            </Badge>
          </Box>
          <Box>
            <Text fontWeight="bold" className="text-gray-700">
              Created Date:
            </Text>
            <Text className="text-gray-600">
              {new Date(urlData.createdDate).toLocaleString()}
            </Text>
          </Box>
          {urlData.description && (
            <Box>
              <Text fontWeight="bold" className="text-gray-700">
                Description:
              </Text>
              <Text className="text-gray-600">{urlData.description}</Text>
            </Box>
          )}
        </Stack>
      </Box>
    </Flex>
  );
};

export default UrlInfo;
