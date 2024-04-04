import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { USER_QUERY_KEY } from '../user/useGetUser';
import { RECEIVE_COFFEE_CHAT_LIST } from './useGetReceiveCoffeechatList';
import { put } from '@/libs/api/client';

export type RejectCoffeechatRequest = {
  message: string;
};

export const useRejectCoffeechat = (coffeechatId: number) => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, RejectCoffeechatRequest>({
    mutationFn: (data) => put(`/api/coffeechat/${coffeechatId}/reject`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [RECEIVE_COFFEE_CHAT_LIST] });
      queryClient.invalidateQueries({ queryKey: [USER_QUERY_KEY] });
      alert('커피챗 응답이 거절되었어요.');
    },
  });
};