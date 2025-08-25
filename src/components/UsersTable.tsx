import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Box,
  TextField,
  MenuItem,
  IconButton,
  TablePagination,
  Paper,
} from '@mui/material';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { useGetUsers } from '@/hooks/useGetUsers';
import type { IUser, UserRole } from '@/types/user';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { extractErrorMessage, type BackendErrorResponse } from '@/utils/errorHandler';

const UsersTable = () => {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();

  const allRoles: (UserRole | 'all')[] = ['all', 'admin', 'employee', 'citizen'];
  const rowsPerPage = 8;

  // State
  const [orderBy, setOrderBy] = useState<keyof IUser | null>(null);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(0);

  const { data, error, isLoading, isFetching } = useGetUsers({
    page: page + 1,
    limit: rowsPerPage,
    sortBy: orderBy ?? 'createdAt',
    sortOrder: order,
    roleFilter: roleFilter === 'all' ? undefined : [roleFilter],
    active: statusFilter === 'all' ? undefined : statusFilter === 'active',
    search,
  });

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as 'all' | 'active' | 'inactive';
    setStatusFilter(value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoleFilter(e.target.value as UserRole | 'all');
  };

  const handleSort = (field: keyof IUser) => {
    if (orderBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(field);
      setOrder('asc');
    }
  };

  const handleEditIconClick = (id: string) => {
    navigate(`/users/${id}/edit`);
  };

  const handleViewIconClick = (id: string) => {
    navigate(`/users/${id}`);
  };

  const paginatedUsers = data?.users ?? [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  // Error handling
  if (error) {
    const typedError = error as AxiosError<BackendErrorResponse>;
    const message = extractErrorMessage(typedError);

    // Special handling for forbidden access
    if (typedError.response?.status === 403 || message.toLowerCase().includes('forbidden')) {
      return (
        <Typography color="error" align="center" p={3}>
          You do not have permission to view this page.
        </Typography>
      );
    }

    return (
      <Typography color="error" align="center" p={3}>
        {message}
      </Typography>
    );
  }

  return (
    <Box width={1} height={790} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          sx={{ flex: 1, maxWidth: 300 }}
        />

        <Box display="flex" gap={2}>
          {currentUser.data?.role === 'admin' && (
            <TextField
              select
              label="Role"
              value={roleFilter}
              onChange={handleRoleChange}
              sx={{ minWidth: 150 }}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight: 300,
                        bgcolor: 'background.default',
                      },
                    },
                  },
                },
              }}
            >
              {allRoles.map((role) => (
                <MenuItem key={role} value={role}>
                  {role === 'all' ? 'All' : role.charAt(0).toUpperCase() + role.slice(1)}
                </MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={handleStatusChange}
            sx={{ minWidth: 150 }}
            slotProps={{
              select: {
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                      bgcolor: 'background.default',
                    },
                  },
                },
              },
            }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="inactive">Inactive</MenuItem>
          </TextField>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              {data &&
                [
                  'Username',
                  'First Name',
                  'Last Name',
                  'Email',
                  'Role',
                  'Status',
                  'Created At',
                ].map((header) => {
                  const keyMap: Record<string, keyof IUser> = {
                    username: 'username',
                    firstname: 'firstname',
                    lastname: 'lastname',
                    email: 'email',
                    role: 'role',
                    status: 'active',
                    createdat: 'createdAt',
                  };
                  const key = keyMap[header.toLowerCase().replace(' ', '')];

                  return (
                    <TableCell
                      key={header}
                      onClick={() => key && handleSort(key)}
                      sx={{
                        fontWeight: 'bold',
                        color: 'background.default',
                        cursor: 'pointer',
                        userSelect: 'none',
                      }}
                    >
                      {header}
                      {orderBy === key && (order === 'asc' ? ' 🔼' : ' 🔽')}
                    </TableCell>
                  );
                })}
              <TableCell sx={{ fontWeight: 'bold', color: 'background.default' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: 'white' }}>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id} sx={{ height: 53 }}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstname}</TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.active ? '✅ Active' : '❌ Inactive'}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleViewIconClick(user.id)}>
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEditIconClick(user.id)}>
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={data?.pagination.total ?? 0}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[8]}
      />

      {isFetching && (
        <Typography variant="body2" align="center" sx={{ py: 1 }}>
          Loading new page...
        </Typography>
      )}
    </Box>
  );
};

export default UsersTable;
