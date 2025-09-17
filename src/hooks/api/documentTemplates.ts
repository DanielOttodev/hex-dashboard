import { DocumentTemplate} from '@/api/entities';
import { createPaginationQueryHook } from '@/api/helpers';

export const useGetDocumentTemplates = createPaginationQueryHook({
  endpoint: '/document-templates',
  dataSchema: DocumentTemplate,
  rQueryParams: { queryKey: ['document-templates'] },
});
