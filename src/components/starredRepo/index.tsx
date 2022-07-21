import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { BsCircleFill } from 'react-icons/bs'
import { IoGitCommitOutline } from 'react-icons/io5'
import { AiOutlineStar, AiFillGithub } from 'react-icons/ai'

export function StarredRepo () {
  return (
    <Box bg="gray.800" p="3" borderRadius="md" w="100%" maxWidth={{sm: "480px",md: "480px", lg: "640px", xl: "640px"}}>
      <Flex alignItems="center" justify="space-between">
        <Text fontSize="19px" color="pink.500">DevBlog</Text>
        <Icon as={AiFillGithub} fontSize="25px" color="gray.500"/>
      </Flex>
      <Text fontSize="16px" noOfLines={1}>App created using ReactJS, Firebase </Text>
      <HStack display="flex" align="center" mt="2" spacing="4">
       <Box display="flex" alignItems="center">
        <Icon mr="1.5" as={BsCircleFill} color="blue.500" fontSize="14px"/>
        <Text fontSize="14px" color="gray.200">Typescript</Text>
       </Box>
        <Box display="flex" alignItems="center">
         <Icon mr="1" as={IoGitCommitOutline} color="green.500" fontSize="25px"/>
         <Text fontSize="14px" color="gray.200">23</Text>
        </Box>
        <Box display="flex" alignItems="center">
          <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="20px"/>
          <Text fontSize="14px" color="gray.200">2</Text>
        </Box>
      </HStack>
    </Box>
  );
}