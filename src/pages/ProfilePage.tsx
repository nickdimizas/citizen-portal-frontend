import { Container } from '@mui/material';

import UserProfile from '../components/UserProfile';

const ProfilePage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <UserProfile />
    </Container>
  );
};

export default ProfilePage;
