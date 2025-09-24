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
  endpoint: '/universe/client/:id',
  responseSchema: Client,
  rQueryParams: { queryKey: ['getClient'] , enabled: false},
});


export const useGetPackageInfo = createGetQueryHook({
  endpoint: '/universe/packagedocuments/:id',
  responseSchema: z.array(z.string()),
  rQueryParams: { queryKey: ['getPackage'], enabled: false },
})

export const useCreateDocuments = createPostMutationHook({
  endpoint: '/universe/documents',
  bodySchema: z.object({
    clientId: z.string().min(1),
    accountId: z.string().min(1),
    packageId: z.string().min(1),
    documents: z.array(z.object({
      name: z.string().min(1),
      content: z.string().min(1),
    })),
  }),
  responseSchema: z.object({
    success: z.boolean(),
    message: z.string().min(1).optional(),
    documentIds: z.array(z.string()).optional(),
  }),
  rMutationParams: {
    onSuccess: (data) => {
      notifications.show({ title: 'Success', message: 'Documents created successfully' });
    },
    onError: (error) => {
      notifications.show({ message: error.message ?? 'An error occurred', color: 'red' });
    },
  },
});

