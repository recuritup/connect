import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, Flex, Stack, Text } from '@sickgyun/ui';
import { useOverlay } from '@toss/use-overlay';
import CoffeechatAcceptConfirm from '../CoffeechatAcceptConfirm';
import CoffeechatRejectConfirm from '../CoffeechatRejectConfirm';
import { type CoffeechatState, CoffeechatStateEnum } from '@/types/coffeechat';
import type { User } from '@/types/user';

type CoffeechatReceiveCardProps = {
  fromUser: User;
  coffeechatId: number;
  state: CoffeechatState;
};

const CoffeechatReceiveCard = ({
  fromUser,
  coffeechatId,
  state,
}: CoffeechatReceiveCardProps) => {
  const overlay = useOverlay();
  const isPending = state === 'PENDING';

  const openCoffeechatAcceptConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <CoffeechatAcceptConfirm
        isOpen={isOpen}
        onClose={close}
        coffeechatId={coffeechatId}
      />
    ));
  };

  const openCoffeechatRejectConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <CoffeechatRejectConfirm
        isOpen={isOpen}
        onClose={close}
        coffeechatId={coffeechatId}
      />
    ));
  };

  return (
    <StyledCoffeechatReceiveCard direction="vertical" spacing={24}>
      {isPending ? (
        <Stack direction="vertical" spacing={6}>
          <Text fontType="body1">{fromUser.name}님이 커피챗 신청을 보냈어요!</Text>
          <Text fontType="body2" color="gray600">
            {fromUser.cardinal}기 {fromUser.isGraduated ? '졸업생' : '재학생'}
          </Text>
        </Stack>
      ) : (
        <Flex justify="space-between" align="center">
          <Stack direction="vertical" spacing={6}>
            <Text fontType="body1">{fromUser.name}님이 커피챗 신청을 보냈었어요.</Text>
            <Text fontType="body2" color="gray600">
              {fromUser.cardinal}기 {fromUser.isGraduated ? '졸업생' : '재학생'}
            </Text>
          </Stack>
          <StyledCoffechatStatus state={state}>
            {CoffeechatStateEnum[state]} 완료
          </StyledCoffechatStatus>
        </Flex>
      )}
      {isPending && (
        <Stack direction="horizontal" align="center" spacing={12}>
          <Button
            onClick={openCoffeechatRejectConfirm}
            styleType="secondary"
            size="small"
            width="120px"
          >
            거절하기
          </Button>
          <Button onClick={openCoffeechatAcceptConfirm} size="small">
            수락하기
          </Button>
        </Stack>
      )}
    </StyledCoffeechatReceiveCard>
  );
};

export default CoffeechatReceiveCard;

const StyledCoffeechatReceiveCard = styled(Stack)`
  width: 100%;
  margin-bottom: 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray200};
  padding-bottom: 16px;
`;

const StyledCoffechatStatus = styled.div<{ state: CoffeechatState }>`
  ${({ theme, state }) => css`
    ${theme.fonts.body2}
    color: ${state === 'REJECT' ? theme.colors.red : theme.colors.primary};
  `}
`;