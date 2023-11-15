'use client';

import { Box, Button, Grid, Image } from '@chakra-ui/react';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/common';
import Footer from '@/components/common/Footer';
import SeniorCard from '@/components/SeniorCard';
import SeniorRegisterButton from '@/components/SeniorRegisterButton';
import SeniorRegisterModal from '@/components/SeniorRegisterModal';
import { POSITION_LIST } from '@/constants/common';
import { useGetSeniorList } from '@/hooks/api/senior/useGetSeniorList';
import { useUserInformation } from '@/store/UserInformation';
import type { Position } from '@/types';

type SeniorPageProps = {
  params: { position: Position };
};

const SeniorPage = ({ params }: SeniorPageProps) => {
  const router = useRouter();
  const overlay = useOverlay();
  const { userInformation } = useUserInformation();
  const { seniorList } = useGetSeniorList();

  const openSeniorRegisterModal = () => {
    overlay.open(({ isOpen, close }) => (
      <SeniorRegisterModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <>
      <Header />
      <Box width="100vw" backgroundColor="white">
        <Box margin="0 auto" paddingTop="48px" paddingBottom="64px" width="80%">
          <Image
            src="/assets/mock_banner.jpeg"
            marginBottom="48px"
            borderRadius="8px"
            objectFit="cover"
            width="100%"
            height="250px"
          />
          <Box display="flex" alignItems="center" gap="8px" marginBottom="48px">
            {POSITION_LIST.map((position) => (
              <Button
                onClick={() => router.push(`/senior/${position}`)}
                variant="ghost"
                fontWeight="medium"
                backgroundColor="white"
                color={decodeURI(params.position) === position ? 'primary' : 'gray.700'}
                _hover={{ color: 'primary', backgroundColor: 'gray.100' }}
              >
                {position}
              </Button>
            ))}
          </Box>
          <Grid templateColumns="repeat(2, 1fr)" gap="32px">
            {seniorList.map((senior) => (
              <SeniorCard
                id={senior.id}
                name={senior.name}
                profileUrl={senior.profileUrl}
                cardinal={senior.cardinal}
                position={senior.position}
                bio={senior.bio}
                company={senior.company}
              />
            ))}
          </Grid>
        </Box>
      </Box>
      <Footer />
      {!userInformation.isGraduate && (
        <SeniorRegisterButton onClick={openSeniorRegisterModal} />
      )}
    </>
  );
};

export default SeniorPage;
