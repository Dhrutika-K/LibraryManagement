import React from 'react';
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"
import NewBooks from "./NewBook"  // Import the new component
import { Box} from '@mui/material';

const Dashboard = () => {
    return (
        <Box>
            <Box sx={{ mb: 8 }}>
                <Navbar  />
            </Box>
        
            <Box sx={{ display: "flex" }}>
                <Box sx={{ height: "auto", ml: 0, width: "14%", bgcolor: "#635c5b" }}>
                    <Sidebar />         
                </Box>
                <Box sx={{ height: "940px", ml: 1, width: "80%" }}>
                    <NewBooks />   
                </Box>
            </Box>
        </Box>
    );
};

export default Dashboard;