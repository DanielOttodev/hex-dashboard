import { Grid, FileInput } from '@mantine/core';
import { Page } from '@/components/page';
import { PageHeader } from '@/components/page-header';
import { paths } from '@/routes';
import { TemplateTable } from './template-table';

const breadcrumbs = [
  { label: 'Dashboard', href: paths.dashboard.root },
  { label: 'Management', href: paths.dashboard.management.root },
  { label: 'Customers', href: paths.dashboard.management.customers.root },
  { label: 'List' },
];

export default function TemplatesPage() {
  return (
    <Page title="Document Templates">
      <PageHeader title="Document Templates" breadcrumbs={breadcrumbs} />

      <Grid>
        <Grid.Col span={12}>
          <TemplateTable />
        </Grid.Col>

        <Grid.Col span={12}>
          <FileInput
            label="Upload Template"
            placeholder="Choose file"
            description="Upload a new document template to the system."
            accept=".docx,.pdf"
            withAsterisk
            required
          />
        </Grid.Col>
      </Grid>
    </Page>
  );
}
