import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { IconExpandMoreFill } from '@seed-design/icon';
import { Button, Flex, Select, Stack, Switch, Text } from '@sickgyun/ui';
import { useOverlay } from '@toss/use-overlay';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import CoffeechatContactFormModal from '@/components/coffeechat/CoffeechatContactFormModal';
import type { GetProfileListParams } from '@/hooks/api/profile/useGetProfileList';
import { useUser } from '@/hooks/common/useUser';

const getMajorFieldName = {
  ALL: '전체 분야',
  FRONTEND: '프론트엔드',
  BACKEND: '백엔드',
  EMBEDDED: '임베디드',
  GAME: '게임',
  ETC: '기타',
} as const;

type ProfileNavigationBarProps = {
  register: UseFormRegister<GetProfileListParams>;
  setValue: UseFormSetValue<GetProfileListParams>;
  watch: UseFormWatch<GetProfileListParams>;
};

const ProfileNavigationBar = ({
  register,
  setValue,
  watch,
}: ProfileNavigationBarProps) => {
  const router = useRouter();
  const overlay = useOverlay();
  const { user, isLoading } = useUser();
  const selectedMajor = watch('major');

  const handleIsRecruitedSwitchChange = (value: any) => {
    setValue('isRecruited', value);
  };

  const handleGoProfileManagePage = () => {
    if (user.hasCreatedProfile) {
      router.push('/profile/update');
    } else {
      router.push('/profile/create');
    }
  };

  const openCoffeechatContactFormModal = () => {
    overlay.open(({ isOpen, close }) => (
      <CoffeechatContactFormModal isOpen={isOpen} onClose={close} />
    ));
  };

  useEffect(() => {
    router.push(`/profile?major=${selectedMajor}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMajor]);

  return (
    <StyledProfileNavigationBar>
      <StyledProfileNavigationBarWrapper>
        <Stack direction="vertical" spacing={18}>
          <StyledMajorSelect>
            <Text fontType="h2">{getMajorFieldName[selectedMajor]}</Text>
            <StyledIconExpandMoreFill />
            <StyledSelect {...register('major')}>
              <option value="ALL">전체 분야</option>
              <option value="FRONTEND">프론트엔드</option>
              <option value="BACKEND">백엔드</option>
              <option value="EMBEDDED">임베디드</option>
              <option value="GAME">게임</option>
              <option value="ETC">기타</option>
            </StyledSelect>
          </StyledMajorSelect>
          <Flex align="center" justify="space-between">
            <Stack direction="horizontal" align="center" spacing={16}>
              <StyledCardinalSelect {...register('cardinal')}>
                <option value={0}>전체 기수</option>
                <option value={1}>1기</option>
                <option value={2}>2기</option>
                <option value={3}>3기</option>
                <option value={4}>4기</option>
              </StyledCardinalSelect>
              <Switch
                options={[
                  { name: '전체', value: false },
                  { name: '재직자', value: true },
                ]}
                value={watch('isRecruited')}
                onChange={handleIsRecruitedSwitchChange}
              />
            </Stack>
            {!isLoading && (
              <Stack direction="horizontal" align="center" spacing={12}>
                <Button onClick={openCoffeechatContactFormModal} styleType="outline">
                  연락처 {user.hasNotContact ? '생성' : '수정'}
                </Button>
                <Button onClick={handleGoProfileManagePage}>
                  프로필 {user.hasCreatedProfile ? '수정' : '생성'}
                </Button>
              </Stack>
            )}
          </Flex>
        </Stack>
      </StyledProfileNavigationBarWrapper>
    </StyledProfileNavigationBar>
  );
};

export default ProfileNavigationBar;

const StyledProfileNavigationBar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  width: 100%;
  padding: 24px 0;
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.gray100};
    background-color: ${theme.colors.white};
  `}
`;

const StyledProfileNavigationBarWrapper = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;

const StyledMajorSelect = styled.div`
  display: flex;
  align-items: center;
`;

const StyledIconExpandMoreFill = styled(IconExpandMoreFill)`
  width: 20px;
  height: 20px;
  margin-left: 8px;
  color: ${({ theme }) => theme.colors.gray900};
`;

const StyledSelect = styled.select`
  opacity: 0;
  position: absolute;
  width: 115px;
  height: 33px;
  cursor: pointer;
`;

const StyledCardinalSelect = styled(Select)`
  min-width: 130px;
`;