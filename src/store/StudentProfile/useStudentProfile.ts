import { useEffect } from 'react';
import { useGetStudentProfile } from '@/hooks/api/student-profile/useGetStudentProfile';
import { useRecoilState } from 'recoil';

import { useUserInformation } from '../UserInformation';
import { hasStudentProfileState } from './hasStudentProfileState';
import { studentProfileState } from './studentProfileState';

export const useStudentProfile = () => {
  const [studnetProfile, setStudentProfile] = useRecoilState(studentProfileState);
  const [hasStudentProfile, setHasStudentProfile] = useRecoilState(hasStudentProfileState);

  const { userInformation } = useUserInformation();
  const { studentProfileData } = useGetStudentProfile(userInformation.userCode);

  useEffect(() => {
    if (studentProfileData) {
      setHasStudentProfile(Boolean(studentProfileData.name));
      setStudentProfile(studentProfileData);
    }
  }, [setHasStudentProfile, setStudentProfile, studentProfileData]);

  return { hasStudentProfile, studnetProfile };
};
