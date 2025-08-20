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
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import EventIcon from '@mui/icons-material/Event';
import PhoneIcon from '@mui/icons-material/Phone';
import UpdateIcon from '@mui/icons-material/Update';
import { useSelector } from 'react-redux';

import type { RootState } from '@/store/store';

const UserProfile = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  if (!user) return null;

  return (
    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ maxWidth: 600, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        {/* Header */}
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            gap: 2,
            px: 3,
            py: 3,
            bgcolor: 'primary.main',
            borderRadius: '8px 8px 0 0',
          }}
        >
          <Avatar sx={{ width: 60, height: 60, bgcolor: 'secondary.main' }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h5" sx={{ fontWeight: 700, color: 'background.default' }}>
            Profile
          </Typography>
        </Paper>

        {/* List of user info */}
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
      </Card>
    </Box>
  );
};

export default UserProfile;
