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
  Alert,
  Snackbar,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Select,
  MenuItem,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import EventIcon from '@mui/icons-material/Event';
import PhoneIcon from '@mui/icons-material/Phone';
import UpdateIcon from '@mui/icons-material/Update';
import { useState } from 'react';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useGetUserById } from '@/hooks/useGetUserById';
import { useToggleUserActive } from '@/hooks/useToggleUserActive';
import { extractErrorMessage } from '@/utils/errorHandler';
import { useChangeUserRole } from '@/hooks/useChangeRole';
import type { UserRole } from '@/types/user';
import { useDeleteUser } from '@/hooks/useDeleteUser';

const UserProfileById = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: currentUser } = useCurrentUser();
  const { data: user, isLoading, error } = useGetUserById(id!);

  const toggleActiveMutation = useToggleUserActive();
  const changeRoleMutation = useChangeUserRole();
  const deleteUserMutation = useDeleteUser();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const [activeStatusDialogOpen, setActiveStatusDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleToggleActive = () => {
    if (!user) return;

    toggleActiveMutation.mutate(user.id, {
      onSuccess: (res) => {
        if (res.status) {
          setSnackbar({
            open: true,
            message: res.message,
            severity: 'success',
          });
        } else {
          setSnackbar({
            open: true,
            message: 'Something went wrong',
            severity: 'error',
          });
        }
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: extractErrorMessage(error),
          severity: 'error',
        });
      },
    });
    setActiveStatusDialogOpen(false);
  };

  const handleChangeRole = () => {
    if (!user || !selectedRole) return;

    changeRoleMutation.mutate(
      { id: user.id, role: selectedRole },
      {
        onSuccess: (res) => {
          setSnackbar({
            open: true,
            message: res.message,
            severity: 'success',
          });
          setRoleDialogOpen(false);
        },
        onError: (error) => {
          setSnackbar({
            open: true,
            message: extractErrorMessage(error),
            severity: 'error',
          });
        },
      },
    );
  };

  const handleDeleteUser = () => {
    if (!user) return;

    deleteUserMutation.mutate(user.id, {
      onSuccess: (res) => {
        setSnackbar({
          open: true,
          message: `User ${res.data.username} deleted successfully`,
          severity: 'success',
        });
        setTimeout(() => {
          setDeleteDialogOpen(false);
          navigate('/users');
        }, 1000);
      },
      onError: (error) => {
        setSnackbar({ open: true, message: extractErrorMessage(error), severity: 'error' });
      },
    });
  };

  const handleUpdateClick = (id: string) => {
    navigate(`/users/${id}/edit`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load user</div>;
  if (!user) return null;

  return (
    <>
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
                <Button variant="contained" color="error" onClick={() => setDeleteDialogOpen(true)}>
                  Delete User
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    setSelectedRole(user.role);
                    setRoleDialogOpen(true);
                  }}
                >
                  Change Role
                </Button>
              </>
            )}
            <Button
              variant="contained"
              color={user.active ? 'warning' : 'success'}
              onClick={() => setActiveStatusDialogOpen(true)}
            >
              {user.active ? 'Deactivate' : 'Activate'}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleUpdateClick(user.id)}
            >
              Update
            </Button>
          </Box>
        </Card>
      </Box>
      {/* Change Active Status Dialog */}
      <Dialog
        open={activeStatusDialogOpen}
        onClose={() => setActiveStatusDialogOpen(false)}
        slotProps={{
          paper: {
            sx: { bgcolor: 'background.default' },
          },
        }}
      >
        <Paper
          sx={{
            bgcolor: 'primary.main',
            px: 2,
            py: 1.5,
            borderRadius: 0,
          }}
          elevation={0}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: 'background.default', textAlign: 'center' }}
          >
            {user?.active ? 'Deactivate User' : 'Activate User'}
          </Typography>
        </Paper>
        <DialogContent>
          <DialogContentText>
            {user?.active
              ? 'Are you sure you want to deactivate this user?'
              : 'Are you sure you want to activate this user?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActiveStatusDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleToggleActive} color={user?.active ? 'error' : 'success'}>
            {user?.active ? 'Deactivate' : 'Activate'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Change Role Dialog */}
      <Dialog
        open={roleDialogOpen}
        onClose={() => setRoleDialogOpen(false)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.default',
              width: 'auto',
              minWidth: 'unset',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            },
          },
        }}
      >
        <Paper
          sx={{
            bgcolor: 'primary.main',
            px: 2,
            py: 1.5,
            borderRadius: 0,
          }}
          elevation={0}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: 'background.default', textAlign: 'center' }}
          >
            Change User Role
          </Typography>
        </Paper>
        <DialogContent>
          <Select
            sx={{ width: 250 }}
            value={selectedRole ?? ''}
            onChange={(e) => setSelectedRole(e.target.value as UserRole)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="citizen">Citizen</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRoleDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleChangeRole}
            color="primary"
            variant="contained"
            disabled={changeRoleMutation.isPending || selectedRole === user.role}
          >
            Change Role
          </Button>
        </DialogActions>
      </Dialog>
      {/* Delete User Dialog */} {/* <-- added */}
      <Dialog
        open={deleteDialogOpen} // <-- added
        onClose={() => setDeleteDialogOpen(false)} // <-- added
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'background.default',
              width: 'auto',
              minWidth: 'unset',
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
            },
          },
        }}
      >
        <Paper
          sx={{
            bgcolor: 'primary.main',
            px: 2,
            py: 1.5,
            borderRadius: 0,
          }}
          elevation={0}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: 'background.default', textAlign: 'center' }}
          >
            Delete User
          </Typography>
        </Paper>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete this user? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteUser} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Snackbar for success/error */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserProfileById;
