import { useState } from 'react';
import { Box, Button, Text, Textarea } from '@chakra-ui/react';

const AboutPage = () => {
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin] = useState(true);
  return (
    <Box className="flex flex-col items-center justify-center h-full bg-white">
      <Box className="flex flex-col items-center p-8 bg-gray-50 rounded-md shadow-md w-full max-w-3xl max-h-[495px] overflow-y-auto">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          About URL Shortener
        </Text>
        {isEditing ? (
          <Textarea
            value={description}
            onChange={(e: any) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="mb-4"
            size="lg"
            rows={6}
          />
        ) : (
          <Box className="flex flex-wrap max-w-full mb-4">
            <Text className="text-gray-600 text-lg break-words overflow-hidden">
              {description}
            </Text>
          </Box>
        )}
        {isAdmin && (
          <Box className="flex justify-end w-full">
            {isEditing ? (
              <Button
                onClick={() => {
                  setIsEditing(false);
                }}
                colorScheme="teal"
                className="mr-2"
              >
                Save
              </Button>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                colorScheme="blue"
                className="mr-2"
              >
                Edit
              </Button>
            )}
            {isEditing && (
              <Button
                onClick={() => setIsEditing(false)}
                colorScheme="red"
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AboutPage;
