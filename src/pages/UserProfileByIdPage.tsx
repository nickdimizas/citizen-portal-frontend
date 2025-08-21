import { Container } from '@mui/material';

import UserProfileById from '@/components/UserProfileById';

const UserProfileByIdPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <UserProfileById />
    </Container>
  );
};

export default UserProfileByIdPage;
