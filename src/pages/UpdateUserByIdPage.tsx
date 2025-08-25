import { Container } from '@mui/material';
import { useParams } from 'react-router-dom';

import UpdateUserById from '@/components/UpdateUserById';

const UpdateUserByIdPage = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <div>Invalid user id</div>;

  return (
    <Container maxWidth="md">
      <UpdateUserById id={id} />
    </Container>
  );
};

export default UpdateUserByIdPage;
