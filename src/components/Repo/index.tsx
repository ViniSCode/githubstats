import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGithub, AiOutlineStar } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';
import { language_colors } from "../../../languageColors";

interface Repo {
  key: string;
  name: string;
  description: string;
  html_url: string;
  language?: string;
  stargazers_count: number;
}

// the repo card
export function Repo ({ name, description, html_url, language, stargazers_count }: Repo) {
  let langColor;
  let ifNoLanguage;

  if (language) {
    try {
      langColor = language_colors[language].color;
    } catch (e) {
      langColor = 'white';
    }
  }
  
  return (
    <Link href={html_url}>
      <Box bg="gray.800" p="4" borderRadius="md" mx="auto" w="100%" maxWidth={{sm: "480px",md: "100%", lg: "100%", xl: "100%"}}  cursor="pointer" boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear">
        <Flex alignItems="center" justify="space-between">
          <Text fontSize="19px" color="pink.500" noOfLines={1}>{name}</Text>
          <Icon as={AiFillGithub} fontSize="25px" color="gray.200"/>
        </Flex>
          {
            description ?(
            <Text fontSize="16px" noOfLines={1}>
              {description}
            </Text>
            ) : (
              <Text fontSize="16px" noOfLines={1} color="gray.400">
              No Description
              </Text>
            )
          }
        <HStack display="flex" align="center" mt="2" spacing="4">
        <Box display="flex" alignItems="center">
          <Icon mr="1.5" as={BsCircleFill} sx={{color: `${langColor ? langColor: '#FFFFFF'}`}} fontSize="13px"/>
          <Text fontSize="14px" color="#ffffff">{language ? language : "None"}</Text>
        </Box>
        {
          stargazers_count && (
            <Box display="flex" alignItems="center">
              <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize="18px"/>
              <Text fontSize="13px" color="gray.200">
                {stargazers_count}
              </Text>
            </Box>
          )
        }
        </HStack>
      </Box>
    </Link>
  );
}