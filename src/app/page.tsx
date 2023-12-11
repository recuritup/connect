'use client';

import { useRouter } from 'next/navigation';
import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import JobPostingList from '@/components/job-posting/JobPostingList';
import LoginBox from '@/components/main/LoginBox';
import { POSITION_LIST } from '@/constants/common';
import { Box, Center, Flex, Image, Link, Text } from '@chakra-ui/react';

const MainPage = () => {
  const router = useRouter();

  const handleGoFullViewJobPosting = () => {
    window.open(
      'https://www.rallit.com/?jobGroup=DEVELOPER&jobLevel=INTERN%2CBEGINNER%2CJUNIOR&pageNumber=1'
    );
  };

  return (
    <>
      <Header />
      <Box width="100vw" backgroundColor="white">
        <Box margin="0 auto" paddingTop="48px" paddingBottom="64px" width="80%">
          {/* 로그인 & 배너 섹션 */}
          <Box display="flex" gap="36px" alignItems="center" marginBottom="64px">
            <Image
              src="/assets/mock_banner.jpeg"
              objectFit="cover"
              borderRadius="8px"
              width="100%"
              height="250px"
              alt="Banner"
            />
            {/* 로그인 박스 */}
            <LoginBox />
          </Box>
          {/* 직군별 리스트 */}
          <Flex flexDirection="column" gap="18px" marginBottom="64px">
            <Text fontSize="22px" fontWeight="bold">
              진로, 취업 관련 고민을 같이 말할 선배, 친구를 찾아봐요!
            </Text>
            <Box display="flex" justifyContent="space-between">
              {POSITION_LIST.map(position => (
                <Center
                  onClick={() => router.push(`/student-profile?position=${position.queryParams}`)}
                  display="flex"
                  flexDirection="column"
                  gap="12px"
                  transition="all 0.25s ease"
                  borderRadius="8px"
                  width="200px"
                  height="120px"
                  _hover={{
                    backgroundColor: 'gray.50',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={`/assets/position/${position.queryParams}.png`}
                    height="48px"
                    alt="Position"
                  />
                  <Text fontSize="16px" fontWeight="semibold">
                    {position.name}
                  </Text>
                </Center>
              ))}
            </Box>
          </Flex>
          <Flex flexDirection="column" gap="18px" marginBottom="64px">
            <Flex alignItems="center" justifyContent="space-between">
              <Text fontSize="22px" fontWeight="bold">
                채용 중인 회사에요!
              </Text>
              <Link onClick={handleGoFullViewJobPosting}>전체 보기</Link>
            </Flex>
            <JobPostingList />
          </Flex>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainPage;