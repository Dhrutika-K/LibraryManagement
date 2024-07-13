import React, { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Button, List, ListItem, ListItemText, Typography, Box, IconButton, Divider } from '@mui/material';
import axios from 'axios';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import RefreshIcon from '@mui/icons-material/Refresh';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await axios.get('http://localhost:5000/api/issues/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('jwt');
      await axios.put(`http://localhost:5000/api/issues/notifications/${id}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <Box
        component="nav"
        sx={{
          width: '14%',
          flexShrink: 0,
          bgcolor: '#635c5b',
          color: 'white',
          height: '940px',
          marginTop:'60px',
          marginLeft: 0
        }}
      >
        <Sidebar />
      </Box>
      <Box sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <NotificationsIcon sx={{ mr: 1 }} />
            <Typography variant="h5" component="h1">Notifications</Typography>
            <IconButton onClick={fetchNotifications} sx={{ ml: 'auto' }}>
              <RefreshIcon />
            </IconButton>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <List>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <ListItem 
                  key={notification._id} 
                  sx={{ 
                    backgroundColor: notification.read ? 'inherit' : '#e3f2fd',
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    mb: 1,
                    borderRadius: 1,
                  }}
                >
                  <ListItemText
                    primary={notification.message}
                    secondary={new Date(notification.createdAt).toLocaleString()}
                  />
                  {notification.read ? (
                    <CheckCircleIcon color="success" sx={{ ml: 1 }} />
                  ) : (
                    <IconButton 
                      color="primary" 
                      onClick={() => markAsRead(notification._id)}
                      size="small"
                    >
                      <MarkEmailReadIcon />
                    </IconButton>
                  )}
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No notifications" />
                <NotificationsIcon color="disabled" sx={{ ml: 1 }} />
              </ListItem>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;