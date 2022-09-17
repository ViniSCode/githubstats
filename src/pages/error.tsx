import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function Overview () {
  const router = useRouter();

  return (
    <Flex direction="column" h="100vh" pb="4" maxW={500} mx="auto" alignItems="center" justify="center" gap="4">
      <Text>Essa página não existe</Text>
      <Button colorScheme='pink' onClick={() => router.push('/')}>Voltar</Button>
    </Flex>
  )
}