// import { Button, Flex, Spinner, Text } from '@chakra-ui/react';
// import { GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import { RiArrowLeftFill } from 'react-icons/ri';
// import { useAppContext } from '../../hooks/useAppContext';

// export default function  Dashboard () {

//   const router = useRouter();
//   const { isError, isLoading } = useAppContext();

  
//   // const [repos, setRepos] = useState<Repos[]>();
//   // // get user data from props;
//   // const userData = data.user; 
//   // // get repos (obj);
//   // const githubRepos = data.user.repositories.edges;

//   // // format repos 
//   // useEffect(() => {
//   //   if (githubRepos) {
//   //     const formattedRepos = githubRepos.map(repo => {
//   //       return repo.node;
//   //     })

//   //     setRepos(formattedRepos);
//   //   }
//   // }, [githubRepos])

//   return (isLoading  && !isError) ? (
//     <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
//       <Text textAlign='center' fontSize="xl">
//       </Text>
//         <Spinner size="lg" />
//     </Flex>
//   ): (
//     <Flex align='center' direction="column" justify='center' height="100vh" gap='2rem'>
//       <Text textAlign='center' fontSize="xl">
//         Something went wrong...
//       </Text>

//       <Button onClick={() => router.push('/')} colorScheme='red' leftIcon={<RiArrowLeftFill fontSize="20px"/>}>
//         Go back
//       </Button>
//     </Flex>
//   )
// } 

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
// }
  