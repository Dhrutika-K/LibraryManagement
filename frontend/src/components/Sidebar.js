import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Divider,
  Box
} from '@mui/material';
import {
  Home as HomeIcon,
  Message as MessageIcon,
  LibraryBooks as LibraryBooksIcon,
  AddBox as AddBoxIcon,
  People as PeopleIcon,
  AssignmentTurnedIn as AssignmentTurnedInIcon,
  Recommend as RecommendIcon,
  Book as BookIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

const Sidebar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : null;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/dashboard', showAlways: true },
    { text: 'Messages', icon: <MessageIcon />, path: '/notifications', showForAdmin: false },
    { text: 'All Books', icon: <LibraryBooksIcon />, path: '/allBook', showAlways: true },
    { text: 'Add Book', icon: <AddBoxIcon />, path: '/addBook', showForAdmin: true },
    { text: 'Manage Students', icon: <PeopleIcon />, path: '/manageStudent', showForAdmin: true },
    { text: 'Issue Request', icon: <AssignmentTurnedInIcon />, path: '/stuReqIssue', showForAdmin: true },
    { text: 'All Issued Book', icon: <BookIcon />, path: '/allissuedBook', showForAdmin: true },
    { text: 'Recommended Book', icon: <RecommendIcon />, path: '/recommandation', showForAdmin: false },
    { text: 'Currently issued Book', icon: <BookIcon />, path: '/stuIssuedBook', showForAdmin: false },
  ];

  const drawer = (
    <div>
      <Divider />
      <List>
        {menuItems.map((item) => {
          if (item.showAlways || (user?.user?.isAdmin ? item.showForAdmin : !item.showForAdmin)) {
            return (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                selected={location.pathname === item.path}
                onClick={isMobile ? handleDrawerToggle : undefined}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ fontFamily: 'Oswald' }} />
              </ListItem>
            );
          }
          return null;
        })}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex', marginLeft:0}}>
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' }, paddingLeft:2 }}
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? mobileOpen : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': { 
            marginLeft: isMobile ? '0 !important' : '0 !important',
            marginTop: isMobile ? 0 : 8,
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#635c5b',
            color: theme.palette.primary.contrastText
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;