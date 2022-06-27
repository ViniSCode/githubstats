import { Box, Flex, HStack, Icon, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { Header } from './../components/Header/index';

import { BsCircleFill } from 'react-icons/bs';
import { IoGitCommitOutline } from "react-icons/io5";
import { AiOutlineStar } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiBuilding } from 'react-icons/bi';

export default function Dashboard () {
  return (
    <Flex direction="column" h="100vh">
      <Header />

        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6" mt="8">
          <Box as="aside" w="64" mr="8">
              <Sidebar />
          </Box>
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" alignItems="flex-start"> 

           {/* //create a components UserOverview */}
            <Flex
              flexDirection="column"
              bg="gray.800"
              py="10"
              px="10"
              borderRadius="30px"
              align="center"
              justify="center"
              width="100%"
              height="100%"
              maxWidth={480}
            >
              <Image src="https://github.com/viniscode.png" w="100%" maxWidth="400px" borderRadius="full"/>
              <Box alignSelf="self-start" mt="5">
                <Text fontSize={["22px", "32px"]} alignSelf="self-start">Vinícius Rodrigues</Text>
                <Text fontSize={["18px", "19px"]} color="pink.500"  alignSelf="self-start">ViniSCode</Text>
              </Box>

              <Text mt="6" fontSize="1xl">CTO at @Rocketseat. Passionate about education and changing people's lives through programming.</Text>
              <HStack spacing="3" mt="3" alignSelf="self-start" alignItems="center">
                <Box display="flex" gap="0.5">
                  <Icon as={HiOutlineLocationMarker} w="20px" h="20px" color="gray.200"/>
                  <Text color="gray.200">Brazil, RS</Text>
                </Box>
                <Box display="flex" gap="0.5" alignItems="center">
                  <Icon as={BiBuilding} w="20px" h="20px" color="gray.200"/>
                  <Text color="gray.200">@Rocketseat</Text>
                </Box>
              </HStack>
              </Flex> 

            <VStack spacing="6">
              <Box bg="gray.800" p="4" borderRadius="md">
                <Text fontSize="18px" color="pink.500">DevBlog</Text>
                <Text fontSize="16px">App created using ReactJS, Firebase (Real time database and Firebase Auth).</Text>
                <HStack display="flex" align="center" mt="4" spacing="4">
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={BsCircleFill} color="blue.500" fontSize="15px"/>
                    <Text fontSize="14px" color="gray.200">Typescript</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1" as={IoGitCommitOutline} color="green.500" fontSize="25px"/>
                    <Text fontSize="14px" color="gray.200">23 Commits</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="20px"/>
                    <Text fontSize="14px" color="gray.200">2 Stars</Text>
                  </Box>
                </HStack>
              </Box>
              
              <Box bg="gray.800" p="4" borderRadius="md">
                <Text fontSize="18px" color="pink.500">DevBlog</Text>
                <Text fontSize="16px">App created using ReactJS, Firebase (Real time database and Firebase Auth).</Text>
                <HStack display="flex" align="center" mt="4" spacing="4">
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={BsCircleFill} color="blue.500" fontSize="15px"/>
                    <Text fontSize="14px" color="gray.200">Typescript</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1" as={IoGitCommitOutline} color="green.500" fontSize="25px"/>
                    <Text fontSize="14px" color="gray.200">23 Commits</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="20px"/>
                    <Text fontSize="14px" color="gray.200">2 Stars</Text>
                  </Box>
                </HStack>
              </Box>

              <Box bg="gray.800" p="4" borderRadius="md">
                <Text fontSize="18px" color="pink.500">DevBlog</Text>
                <Text fontSize="16px">App created using ReactJS, Firebase (Real time database and Firebase Auth).</Text>
                <HStack display="flex" align="center" mt="4" spacing="4">
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={BsCircleFill} color="blue.500" fontSize="15px"/>
                    <Text fontSize="14px" color="gray.200">Typescript</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1" as={IoGitCommitOutline} color="green.500" fontSize="25px"/>
                    <Text fontSize="14px" color="gray.200">23 Commits</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="20px"/>
                    <Text fontSize="14px" color="gray.200">2 Stars</Text>
                  </Box>
                </HStack>
              </Box>
              
              <Box bg="gray.800" p="4" borderRadius="md">
                <Text fontSize="18px" color="pink.500">DevBlog</Text>
                <Text fontSize="16px">App created using ReactJS, Firebase (Real time database and Firebase Auth).</Text>
                <HStack display="flex" align="center" mt="4" spacing="4">
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={BsCircleFill} color="blue.500" fontSize="15px"/>
                    <Text fontSize="14px" color="gray.200">Typescript</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1" as={IoGitCommitOutline} color="green.500" fontSize="25px"/>
                    <Text fontSize="14px" color="gray.200">23 Commits</Text>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="20px"/>
                    <Text fontSize="14px" color="gray.200">2 Stars</Text>
                  </Box>
                </HStack>
              </Box>
            </VStack>
          </SimpleGrid>
        </Flex>
    </Flex>
  );
}

