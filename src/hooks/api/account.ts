import { Client } from '@/api/entities';
import { createPostMutationHook, createGetQueryHook } from '@/api/helpers';
import { notifications } from '@mantine/notifications';
import { z } from 'zod';


/*
export const useGetAccountInfo = createPostMutationHook({
  endpoint: '/universe/account',
  bodySchema: z.object({ clientId: z.string().min(1) }),
  responseSchema: Client,
  rMutationParams: {
    onSuccess: (data) => {
      notifications.show({ title: 'Success', message: 'Found client' });
    },
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  },
});

*/
export const useGetAccountInfo = createGetQueryHook({
  endpoint: '/universe/account/:id',
  responseSchema: Client,
  
  rQueryParams: { queryKey: ['getClient'] , enabled: false},
});



