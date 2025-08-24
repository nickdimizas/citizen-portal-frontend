import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

import homeImage from '@/assets/home-image.png';

const HomePage = () => {
  return (
    <Box
      sx={{
        height: '100%',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={homeImage}
        alt="Home"
        sx={{
          maxWidth: 700,
          width: '100%',
          borderRadius: 2,
          boxShadow: 3,
        }}
      />

      <Typography variant="body1" align="center" maxWidth={700}>
        Our modern digital service is designed to connect citizens with public services seamlessly,
        making their lives easier and more efficient. By providing a user-friendly platform, we
        empower you to access essential services, make requests, and find the support you need, all
        from the convenience of your computer. Our goal is to simplify the way you interact with
        public services, ensuring a smooth and hassle-free experience for everyone.
      </Typography>

      <Typography variant="h6" align="center" sx={{ fontWeight: 700 }}>
        News and Posts
      </Typography>

      <List sx={{ maxWidth: 700, listStyleType: 'disc', pl: 4 }}>
        <ListItem sx={{ display: 'list-item' }}>
          <ListItemText
            primary="Community Clean-Up Initiative"
            secondary="We are excited to announce our upcoming community clean-up initiative! Join us this Saturday at the local park to help keep our neighborhood beautiful. All volunteers are welcome."
          />
        </ListItem>
        <ListItem sx={{ display: 'list-item' }}>
          <ListItemText
            primary="Public Forum on City Planning"
            secondary="A public forum will be held next Tuesday to discuss future city planning projects. Your input is valuable, and we encourage all citizens to attend and share their ideas."
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default HomePage;
