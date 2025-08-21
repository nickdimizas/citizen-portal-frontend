import { Container } from '@mui/material';

import UsersTable from '@/components/UsersTable';

const UsersTablePage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <UsersTable />
    </Container>
  );
};

export default UsersTablePage;
