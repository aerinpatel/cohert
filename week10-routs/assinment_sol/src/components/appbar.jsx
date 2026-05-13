import React from "react";
// import { AppBar, Toolbar, Typography, Button } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const AppBarComponent = () => {
    const { user, logout } = useAuth();
    
    return (
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
            </Typography>
            {user ? (
            <>
                <Button color="inherit" component={Link} to="/profile">
                Profile
                </Button>
                <Button color="inherit" onClick={logout}>
                Logout
                </Button>
            </>
            ) : (
            <>
                <Button color="inherit" component={Link} to="/login">
                Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                Register
                </Button>
            </>
            )}
        </Toolbar>
        </AppBar>
    );
}