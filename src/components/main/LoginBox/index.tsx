import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserInformation } from '@/store/UserInformation';
import { Box, Button, Center, Flex, Image, Text, Text as TextButton } from '@chakra-ui/react';
import { useOverlay } from '@toss/use-overlay';

import UserInformationUpdateModal from '../UserInformationUpdateModal';

const LoginBox = () => {
  const router = useRouter();
  const overlay = useOverlay();
  const { isLogin, userInformation } = useUserInformation();

  const handleLogin = () => {
    if (!process.env.NEXT_PUBLIC_AUTH_URL) return;
    router.replace(process.env.NEXT_PUBLIC_AUTH_URL);
  };

  const handleGoJumpit = () => {
    window.open('https://www.jumpit.co.kr');
  };

  const handleGoWanted = () => {
    window.open('https://www.wanted.co.kr');
  };

  const openUserInformationUpdateModal = useCallback(() => {
    overlay.open(({ isOpen, close }) => (
      <UserInformationUpdateModal isOpen={isOpen} onClose={close} />
    ));
  }, [overlay]);

  useEffect(() => {
    if (userInformation.isGraduate) {
      if (!userInformation.company) {
        openUserInformationUpdateModal();
      }
    }
  }, [openUserInformationUpdateModal, userInformation.company, userInformation.isGraduate]);

  return (
    <Box
      padding="32px"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.200"
      width="500px"
      height="250px"
    >
      {isLogin ? (
        <Flex flexDirection="column" gap="24px" width="100%" height="100%">
          <Flex flexDirection="column" gap="6px">
            <Flex alignItems="center" gap="2px">
              <Text fontSize="12px" color="gray.500">
                {userInformation.cardinal}기
              </Text>
              <Text fontSize="12px" color="gray.500">
                {userInformation.isGraduate ? '졸업생' : '학생'}
              </Text>
            </Flex>
            <Flex alignItems="center" gap="8px">
              <Flex alignItems="center" gap="4px">
                <Text fontSize="18px" fontWeight="medium">
                  {userInformation.name}님
                </Text>
                <Text fontSize="18px" fontWeight="medium">
                  {userInformation.isGraduate ? '알려주셔야죠?' : '취업하셔야죠?'}
                </Text>
              </Flex>
              <TextButton
                onClick={openUserInformationUpdateModal}
                fontSize="16px"
                color="gray.500"
                _hover={{ cursor: 'pointer' }}
              >
                설정
              </TextButton>
            </Flex>
            <Text fontSize="16px" color="gray.500">
              {userInformation.email}
            </Text>
          </Flex>
          <Flex alignItems="center" justifyContent="space-between">
            <Center
              onClick={handleGoJumpit}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="6px"
              padding="12px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              _hover={{ cursor: 'pointer', color: 'primary' }}
              width="48%"
              height="79px"
            >
              <Image src="/assets/jumpit.png" height="24px" alt="Jumpit" />
              <Text fontSize="14px" fontWeight="medium">
                점핏 바로가기
              </Text>
            </Center>
            <Center
              onClick={handleGoWanted}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              gap="6px"
              padding="12px"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="8px"
              _hover={{ cursor: 'pointer', color: 'primary' }}
              width="48%"
              height="79px"
            >
              <Image src="/assets/wanted.png" height="24px" alt="Wanted" />
              <Text fontSize="14px" fontWeight="medium">
                원티드 바로가기
              </Text>
            </Center>
          </Flex>
        </Flex>
      ) : (
        <Flex alignItems="center" width="100%" height="100%">
          <Flex flexDirection="column" gap="48px" width="100%">
            <Box>
              <Text fontSize="20px" fontWeight="medium">
                로그인하고
              </Text>
              <Text fontSize="20px" fontWeight="medium">
                다양한 취업 정보를 얻어봐요!
              </Text>
            </Box>
            <Button onClick={handleLogin} width="100%">
              로그인
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

export default LoginBox;