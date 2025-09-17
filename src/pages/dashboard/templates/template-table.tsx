import { Badge, MultiSelect, Radio, Stack, TextInput } from '@mantine/core';
import { usePagination } from '@/api/helpers';
import { DataTable } from '@/components/data-table';
import { ExportButton } from '@/components/export-button';
import { useGetDocumentTemplates } from '@/hooks';

export function TemplateTable() {
  const { page, limit, setLimit, setPage } = usePagination({ page: 1, limit: 10 });
  const { data, isLoading } = useGetDocumentTemplates({ query: { page, limit } });

  const totalRecords = data?.meta.total ?? 0;
  const records = data?.data ?? [];

  const { tabs, filters } = DataTable.useDataTable({
    tabsConfig: {
      tabs: [
        { value: 'all', label: 'All', counter: totalRecords },
        { value: 'available', label: 'Available', color: 'green', counter: 10 },
        { value: 'archived', label: 'Archived', counter: 0, color: 'red' },
      ],
    },
  });

  const uniqueStatesOptions = Array.from(new Set(records.map((documentTemplate) => documentTemplate.version)));

  return (
    <DataTable.Container>
      <DataTable.Title
        title="Documents Templates"
        description="All available document templates in my organization."
        actions={
          <ExportButton variant="default" size="xs">
            Export
          </ExportButton>
        }
      />

      <DataTable.Tabs tabs={tabs.tabs} onChange={tabs.change} />

      <DataTable.Filters filters={filters.filters} onClear={filters.clear} />

      <DataTable.Content>
        <DataTable.Table
          page={page}
          records={records}
          fetching={isLoading}
          onPageChange={setPage}
          recordsPerPage={limit}
          totalRecords={totalRecords}
          onRecordsPerPageChange={setLimit}
          recordsPerPageOptions={[5, 10, 30]}
          columns={[
            {
              accessor: 'name',
              filtering: Boolean(filters.filters.name),
              filter: (
                <TextInput
                  placeholder="Search by name"
                  value={filters.filters.name?.value as string}
                  onChange={(e) =>
                    filters.change({
                      name: 'name',
                      label: 'Name',
                      value: e.currentTarget.value,
                    })
                  }
                />
              ),
            },
            { accessor: 'Description' },
            { accessor: 'Date Created' },
            {
              accessor: 'Version',

            },
            {
              accessor: 'active',
              width: 120,
              filtering: Boolean(filters.filters.active),
              filter: (
                <Radio.Group
                  value={filters.filters.active?.value ? 'true' : 'false'}
                  onChange={(value) =>
                    filters.change({
                      name: 'active',
                      label: 'Active',
                      value: value === 'true',
                      valueLabel: value === 'true' ? 'Active' : 'Inactive',
                    })
                  }
                >
                  <Stack>
                    <Radio value="true" label="Active" />
                    <Radio value="false" label="Inactive" />
                  </Stack>
                </Radio.Group>
              ),
              render: (company) => (
                <Badge w="100%" size="sm" variant="outline" color={company.active ? 'teal' : 'red'}>
                  {company.active ? 'Active' : 'Inactive'}
                </Badge>
              ),
            },
          ]}
        />
      </DataTable.Content>
    </DataTable.Container>
  );
}
