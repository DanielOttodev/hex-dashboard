import { Input, Loader, Stack, Select, Paper, Divider, Container, Title, Button } from '@mantine/core';
import { Page } from '@/components/page';
import { useState } from 'react';
import {useGetAccountInfo} from '@/hooks';


const tables = [
  "Loan Package 1",
  "Loan Package 2",
  "Loan Package 3",
];

export default function TablesPage() {
  const [search, setSearch] = useState('');
  const { data, refetch } = useGetAccountInfo({ route: { id: search } });
function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  }
}

const handleSearch = debounce((value: string) => {
  console.log('Searching for:', value);
  refetch();
}, 300);



  return (
    <Page title="Home">
      <Input placeholder="Search Member" maw={400} mx="auto" mb="xl" value={search} onChange={(event) => setSearch(event.currentTarget.value)} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearch(search);
      }    
      }} />
     {  
        search.length > 0 ? <Loader color='green' type='dots' mb={20} /> : null
     } 

      <Stack gap="xl">
        <Paper p="md" >
          <p>Member:{data}</p>
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
        <Button  variant="filled" color='green' size="md" fullWidth> Generate Documents </Button>
      </Stack>
    </Page>
  );
}
