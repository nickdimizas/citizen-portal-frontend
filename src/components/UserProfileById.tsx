import {
  Box,
  Card,
  Typography,
  Avatar,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import EventIcon from '@mui/icons-material/Event';
import PhoneIcon from '@mui/icons-material/Phone';
import UpdateIcon from '@mui/icons-material/Update';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useGetUserById } from '@/hooks/useGetUserById';

const UserProfileById = () => {
  const { id } = useParams();
  console.log('Param id:', id);
  const { data: currentUser } = useCurrentUser();
  const { data: user, isLoading, error } = useGetUserById(id!);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user</div>;
  if (!user) return null;

  return (
    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        {/* Header */}
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1,
            bgcolor: 'primary.main',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ width: 55, height: 55, bgcolor: 'secondary.main' }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5" sx={{ fontWeight: 700, color: 'background.default' }}>
              User Profile
            </Typography>
          </Box>
          <Box textAlign="right">
            <Typography sx={{ fontWeight: 500, color: 'background.default' }}>
              Role: {user.role}
            </Typography>
            <Typography sx={{ color: 'background.default' }}>
              Status: {user.active ? '✅ Active' : '❌ Inactive'}
            </Typography>
          </Box>
        </Paper>

        <List sx={{ bgcolor: 'background.default', p: 3 }}>
          {/* Username */}
          <ListItem>
            <ListItemIcon>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Username"
              secondary={user.username}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* Email */}
          <ListItem>
            <ListItemIcon>
              <EmailIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Email"
              secondary={user.email}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* First & Last name */}
          <ListItem>
            <ListItemIcon>
              <PersonIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Name"
              secondary={`${user.firstname} ${user.lastname}`}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* Address (single row with all fields) */}
          <ListItem>
            <ListItemIcon>
              <HomeIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Address"
              secondary={`${user.address.street} ${user.address.number}, ${user.address.city}, ${user.address.postcode}`}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* Phone */}
          <ListItem>
            <ListItemIcon>
              <PhoneIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Phone"
              secondary={user.phoneNumber}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* SSN */}
          <ListItem>
            <ListItemIcon>
              <FingerprintIcon sx={{ fontSize: 40 }} />
            </ListItemIcon>
            <ListItemText
              primary="Social Security Number"
              secondary={user.ssn}
              slotProps={{
                primary: { sx: { fontWeight: 600 } },
                secondary: { sx: { fontSize: '0.95rem' } },
              }}
            />
          </ListItem>

          {/* Created At */}
          <ListItem>
            <ListItemIcon>
              <EventIcon sx={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary="Created:"
              secondary={new Date(user.createdAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              slotProps={{
                primary: { sx: { fontWeight: 600, fontSize: '0.8rem' } },
                secondary: { sx: { fontSize: '0.7rem' } },
              }}
            />
          </ListItem>

          {/* Updated At */}
          <ListItem>
            <ListItemIcon>
              <UpdateIcon sx={{ fontSize: 25 }} />
            </ListItemIcon>
            <ListItemText
              primary="Last Update:"
              secondary={new Date(user.updatedAt).toLocaleDateString('en-GB', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
              slotProps={{
                primary: { sx: { fontWeight: 600, fontSize: '0.8rem' } },
                secondary: { sx: { fontSize: '0.7rem' } },
              }}
            />
          </ListItem>
        </List>

        {/* Buttons */}
        <Box display="flex" justifyContent="space-around" p={2} bgcolor="background.default">
          {currentUser?.role === 'admin' && (
            <>
              <Button variant="contained" color="secondary">
                Change Role
              </Button>
              <Button variant="contained" color={user.active ? 'error' : 'success'}>
                {user.active ? 'Deactivate' : 'Activate'}
              </Button>
            </>
          )}
          <Button variant="contained" color="secondary">
            Update
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default UserProfileById;
