import { Box, Card, Typography, Avatar, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  if (!user) return null;

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ p: 0, maxWidth: 600, width: '100%' }}>
        {/* Header with background, icon, and shadow */}
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            px: 3,
            py: 2,
            bgcolor: 'primary.main',
            boxShadow: '3',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'background.default',
            }}
          >
            My Profile
          </Typography>
        </Paper>

        {/* Card Content */}
        <Box sx={{ p: 3 }}>
          {/* Row 1: Username | Email */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  fontSize: '1rem',
                }}
              >
                Username
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.username}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.email}
              </Typography>
            </Box>
          </Box>

          {/* Row 2: Firstname | Lastname */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                First Name
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.firstname}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Last Name
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.lastname}
              </Typography>
            </Box>
          </Box>

          {/* Row 3: Address title */}
          <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem', p: 2 }}>
            Address:
          </Typography>

          {/* Row 4: Street | Number */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Street
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.0rem' }}>
                {user.address.street}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                Number
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.0rem' }}>
                {user.address.number}
              </Typography>
            </Box>
          </Box>

          {/* Row 5: City | Postcode */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                City
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.address.city}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Postcode
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.address.postcode}
              </Typography>
            </Box>
          </Box>

          {/* Row 6: Phone | SSN */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Phone
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.phoneNumber}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '1rem' }}>
                SSN
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.05rem' }}>
                {user.ssn}
              </Typography>
            </Box>
          </Box>

          {/* Row 7: Created At | Updated At */}
          <Box sx={{ display: 'flex', gap: 2, p: 2 }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.90rem' }}>
                Created At
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                {user.createdAt}
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.90rem' }}>
                Updated At
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '0.95rem' }}>
                {user.updatedAt}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfile;
