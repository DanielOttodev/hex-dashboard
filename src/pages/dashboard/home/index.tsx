import { Input, Loader, Stack, Select, Paper, Divider, Container, Title } from '@mantine/core';
import { Page } from '@/components/page';
import { useState } from 'react';



const tables = [
  "Loan Package 1",
  "Loan Package 2",
  "Loan Package 3",
];

export default function TablesPage() {
  const [search, setSearch] = useState('');

  return (
    <Page title="Home">
      <Input placeholder="Search Member" maw={400} mx="auto" mb="xl" value={search} onChange={(event) => setSearch(event.currentTarget.value)} />
     {  
        search.length > 0 ? <Loader color='green' type='dots' mb={20} /> : null
     } 

      <Stack gap="xl">
        <Paper p="md" >
          <p>Member: </p>
          <p>Account: </p>
          <p>Package: </p>
        </Paper>
        <Divider my="xs" />
      
      <Paper p="md" > 
        <Title order={3} mb="md">Select an account</Title>
          <Select
              disabled
              placeholder="Select account"
              data={tables.map((table) => ({ value: table, label: table }))}
              mb="xl"
            /> 
      </Paper>
        <Paper p="md" >
          <Title order={3} mb="md">Package</Title>
          <Select
            disabled
            placeholder="Select package"
            data={tables.map((table) => ({ value: table, label: table }))}
            mb="xl"
          />
        </Paper>
      </Stack>
    </Page>
  );
}
