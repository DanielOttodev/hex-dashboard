import { Input, Loader, Stack, Select, Paper, Divider, Container, Title, Button } from '@mantine/core';
import { Page } from '@/components/page';
import { useState } from 'react';
import {useGetAccountInfo, useGetPackageInfo, useCreateDocuments} from '@/hooks';


const tables = [
  "Loan Package 1",
  "Loan Package 2",
  "Loan Package 3",
];

export default function TablesPage() {
  const [search, setSearch] = useState('');
  const [account,setAccount] = useState('');
  const [packageId, setPackageId] = useState('');
  const { data, refetch , isLoading} = useGetAccountInfo({ route: { id: search } });
  const { data: packageData, refetch: refetchPackage } = useGetPackageInfo({ route: { id: account} });

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

const handleAccountChange = (value: string | null) => {
  setAccount(value || '');
  // Fetch package info based on selected account
  refetchPackage();
}

  return (
    <Page title="Home">
      <Input placeholder="Search Member" maw={400} mx="auto" mb="xl" value={search} onChange={(event) => setSearch(event.currentTarget.value)} onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearch(search);
      }    
      }} />
     {  
        isLoading ? <Loader color='green' type='dots' mb={20} /> : null
     } 

      <Stack gap="xl">
        <Paper p="md" >
          <p>Member: {data?.name}</p>
          <p>Account: {account} </p>
          <p>Package: {packageId} </p>
        </Paper>
        <Divider my="xs" />
      
      <Paper p="md" > 
        <Title order={3} mb="md">Select an account</Title>
          <Select
              disabled={data?.accounts ? false : true}
              value={account}
              onChange={(value) => handleAccountChange(value)}
              placeholder="Select account"
              data={data?.accounts ? data.accounts.map((account) => ({ value: account.id, label: account.name })) : []}
              mb="xl"
            /> 
      </Paper>
        <Paper p="md" >
          <Title order={3} mb="md">Package</Title>
          <Select
            disabled={packageData ? false : true}
            value={packageId}
            onChange={(value) => setPackageId(value || '')}
            placeholder="Select package"
            data={packageData ? packageData.map((pkg) => ({ value: pkg, label: pkg })) : []}
            mb="xl"
          />
        </Paper>
        <Button  variant="filled" color='green' size="md" fullWidth> Generate Documents </Button>
      </Stack>
    </Page>
  );
}
