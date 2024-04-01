import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Text } from '@sickgyun/ui';
import { Qna } from '@/types/qna';

type QnaPostCategoryProps = {
  questionType: Qna;
  isWriteCategory?: boolean;
  isActive?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const QnaPostCategory = ({
  questionType,
  isWriteCategory,
  isActive,
  onClick,
}: QnaPostCategoryProps) => {
  let emoji: string;
  let categoryTitle: string;

  switch (questionType) {
    case Qna.DEVELOP:
      emoji = '💻';
      categoryTitle = '개발';
      break;
    case Qna.RECRUIT:
      emoji = '👔';
      categoryTitle = '취업';
      break;
    case Qna.CONCERN:
      emoji = '🤔';
      categoryTitle = '고민';
      break;
    default:
      emoji = '';
      categoryTitle = '';
  }

  return (
    <StyledQnaCategory
      isWriteCategory={isWriteCategory}
      isActive={isActive}
      onClick={onClick}
    >
      <Text>{emoji}</Text>
      <Text fontType="body2">{categoryTitle}</Text>
    </StyledQnaCategory>
  );
};

export default QnaPostCategory;

const StyledQnaCategory = styled.div<{ isWriteCategory: boolean; isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 26px;
  gap: 7px;
  padding: 5px 13px;
  background-color: ${({ theme }) => theme.colors.gray300};
  border-radius: 30px;
  ${({ theme, isWriteCategory, isActive }) =>
    isWriteCategory &&
    css`
      border: 1px solid ${isActive ? theme.colors.primary : theme.colors.gray300};
      cursor: pointer;
      background-color: ${isActive ? theme.colors.primary : theme.colors.white};
      & > span {
        color: ${isActive && theme.colors.white};
      }
    `}
`;