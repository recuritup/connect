import styled from '@emotion/styled';
import { useOverlay } from '@toss/use-overlay';
import { useParams, useRouter } from 'next/navigation';
import QnaDeleteConfirm from '../QnaDeleteConfirm';

type qnaModifyBoxProps = {
  qnaId: number;
};

const QnaModifyBox = ({ qnaId }: qnaModifyBoxProps) => {
  const overlay = useOverlay();

  const { id } = useParams();
  const router = useRouter();

  const handleEditQna = () => {
    router.push(`/qna/edit/${qnaId}`);
  };

  const openDeleteQnaConfirm = () => {
    overlay.open(({ isOpen, close }) => (
      <QnaDeleteConfirm isOpen={isOpen} onClose={close} id={Number(id)} />
    ));
  };

  return (
    <StyledQnaModifyBox>
      <StyledModifyButton onClick={handleEditQna}>수정하기</StyledModifyButton>
      <StyledModifyButton onClick={openDeleteQnaConfirm}>삭제하기</StyledModifyButton>
    </StyledQnaModifyBox>
  );
};

export default QnaModifyBox;

const StyledQnaModifyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  margin-top: 5px;
  right: 0;
  width: 128px;
  height: 112px;
  background-color: white;
  padding: 10px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 12px;
  border-radius: 8px;
`;

const StyledModifyButton = styled.div`
  display: flex;
  align-items: center;
  width: 112px;
  height: 48px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray100};
  }
`;
