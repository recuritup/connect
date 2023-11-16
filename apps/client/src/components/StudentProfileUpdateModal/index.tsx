import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from '@chakra-ui/react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useDeleteStudentProfileMutation } from '@/hooks/api/student-profile/useDeleteStudentProfileMutation';
import { useGetStudentProfile } from '@/hooks/api/student-profile/useGetStudentProfile';
import { useUpdateStudentProfileMutation } from '@/hooks/api/student-profile/useUpdateStudentProfileMutation';
import { useUserInformation } from '@/store/UserInformation';

type StudentProfileUpdateFormInput = {
  githubId?: string;
  email?: string;
  bio?: string;
  position: string;
  company?: string;
};

type StudentProfileUpdateModalProps = ModalProps;

const StudentProfileUpdateModal = ({
  isOpen,
  onClose,
}: StudentProfileUpdateModalProps) => {
  const { userInformation } = useUserInformation();
  const { register, handleSubmit: handleUpdateStudentProfileSubmit } =
    useForm<StudentProfileUpdateFormInput>();

  const { studentProfile } = useGetStudentProfile(userInformation.userCode);
  const { mutate: updateStudentProfileMutate } = useUpdateStudentProfileMutation();
  const { mutate: deleteStudentProfileMutate } = useDeleteStudentProfileMutation();

  const onUpdateStudentProfileSubmit: SubmitHandler<StudentProfileUpdateFormInput> = (
    data
  ) => {
    const updateStudentProfileRequstData = {
      githubId: data.githubId,
      email: data.email,
      bio: data.bio,
      position: data.position,
      company: data.company,
    };

    updateStudentProfileMutate(updateStudentProfileRequstData);
    onClose();
  };

  const handleDeleteStudentProfile = () => {
    deleteStudentProfileMutate();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleUpdateStudentProfileSubmit(onUpdateStudentProfileSubmit)}
      >
        <ModalHeader>
          <Text as="span">선배 프로필 수정</Text>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
          <Flex flexDirection="column" gap="16px">
            <Flex gap="8px">
              <Input
                value={studentProfile.name}
                placeholder="이름을 입력해주세요."
                disabled
              />
              <Input
                defaultValue={studentProfile.githubId}
                placeholder="깃허브 아이디를 입력해주세요."
                {...register('githubId')}
              />
            </Flex>
            <Input
              defaultValue={studentProfile.email}
              placeholder="이메일을 적어주세요."
              {...register('email')}
            />
            <Input
              defaultValue={studentProfile.bio}
              placeholder="소개 말을 적어주세요."
              {...register('bio')}
            />
            <Select size="md" {...register('position')}>
              <option value="FRONTEND">프론트엔드</option>
              <option value="BACKEND">백엔드</option>
              <option value="DEVOPS">데브옵스</option>
              <option value="APP">앱</option>
              <option value="DESIGNER">디자이너</option>
            </Select>
            {studentProfile.isGraduate && (
              <Input placeholder="회사명을 입력해주세요." {...register('company')} />
            )}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Flex gap="12px">
            <Button onClick={handleDeleteStudentProfile} color="white" colorScheme="red">
              내 프로필 삭제
            </Button>
            <Button type="submit">수정</Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StudentProfileUpdateModal;