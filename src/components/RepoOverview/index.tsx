import { Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { AiFillGithub, AiOutlineStar } from 'react-icons/ai';
import { BsCircleFill } from 'react-icons/bs';

interface RepoOverview {
  key: string;
  name: string;
  description: string;
  html_url: string;
  language: {
    color: string;
    name: string;
  };
  stargazers_count: number;
}

// Show this repos on Overview Page
export function RepoOverview ({ name, description, html_url, language, stargazers_count }: RepoOverview) {
    let langColor;

    if (language) {
      langColor = language.color
    }

  return (
    <Link href={html_url}>
      <Box bg="gray.800" px="4" py={{base: "4", sm: "4", md: "4", lg: "4", xl: "3", '2xl': '4'}} borderRadius="md" w="100%" maxWidth={{sm: "480px",md: "100%", lg: "100%", xl: "100%"}} cursor="pointer" boxShadow="md" _hover={{boxShadow: 'none'}} transition="box-shadow 200ms linear">
        <Flex alignItems="center" justify="space-between">
          <Text fontSize={{base: "18px", sm: "18px", md: "18px", lg: "18px", xl: "15px", '2xl': '18px'}} color="pink.500" noOfLines={1}>{name}</Text>
          <Icon as={AiFillGithub} fontSize={{base: "25px", sm: "25px", md: "25px", lg: "25px", xl: "20px", '2xl': '25px'}} color="gray.200"/>
        </Flex>
          {
            description ?(
            <Text fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '14px'}} noOfLines={1}>
              {description}
            </Text>
            ) : (
              <Text fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '12px'}} noOfLines={1} color="gray.400">
              No Description
              </Text>
            )
          }
        <HStack display="flex" align="center" mt={{base: "2", sm: "2", md: "2", lg: "2", xl: "1", '2xl': '2'}} spacing={{base: "4", sm: "4", md: "4", lg: "4", xl: "2", '2xl': '4'}}>
        <Box display="flex" alignItems="center">
          <Icon mr="1.5" as={BsCircleFill} sx={{color: `${langColor}`}} fontSize={{base: "13px", sm: "13px", md: "13px", lg: "13px", xl: "9px", '2xl': '13px'}}/>
          <Text fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "11px", '2xl': '14px'}} color="#ffffff">{language ? language.name : "None"}</Text>
        </Box>
        {
          stargazers_count && (
            <Box display="flex" alignItems="center">
              <Icon mr="1.5" as={AiOutlineStar} color="yellow.500" fontSize={{base: "18px", sm: "18px", md: "18px", lg: "18px", xl: "13px", '2xl': '18px'}}/>
              <Text fontSize={{base: "14px", sm: "14px", md: "14px", lg: "14px", xl: "12px", '2xl': '14px'}} color="gray.200">
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