import * as React from "react";
import PropTypes from "prop-types";
import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
    Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Login from "./Login";

import { Link } from "react-router-dom";

const drawerWidth = 240;
// const navItems = ["Home", "About", "Contact"];
const navItems = [
    {
        Header: "หน้าแรก",
        Link: "/",
    },
    {
        Header: "ประวัติการจอง",
        Link: "/listbooking",
    },
    {
        Header: "จอง",
        Link: "/booking",
    },
    {
        Header: "เช็ครอบ",
        Link: "/",
    },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [open, setOpen] = React.useState(false);

    const [isLogin, setIsLogin] = React.useState(false);

    const Logout = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("name");
        localStorage.removeItem("surname");
        localStorage.removeItem("username");
        setIsLogin(false);
        setOpen(true);
    };

    React.useEffect(() => {
        if (localStorage.getItem("accessToken") != null) {
            setIsLogin(true);
        }
    }, [localStorage.getItem("accessToken")]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            {open ? (
                <>
                    <Login obj={open} setObj={setOpen} ModalOn="/" />{" "}
                </>
            ) : (
                <></>
            )}
            <Typography variant="h6" sx={{ my: 2 }}>
                Modbus
            </Typography>
            <Divider />
            <List>
                {/* Navbar Mobile */}
                {navItems.map((item) => (
                    <ListItem key={item.Link} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: "center" }}
                            color="primary"
                        >
                            <Link to={item.Link}>
                                <ListItemText
                                    primary={item.Header}
                                    color="primary"
                                    sx={{ color: "#000" }}
                                />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {/* Footer Navbar Mobile */}
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                        {isLogin ? (
                            <>
                                <ListItemText
                                    onClick={Logout}
                                    primary="ออกจากระบบ"
                                    sx={{ color: "#000" }}
                                />
                            </>
                        ) : (
                            <>
                                <ListItemText
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    primary="เข้าสู่ระบบ"
                                    sx={{ color: "#000" }}
                                />
                            </>
                        )}
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: "none" } }}
                    >
                    <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="span"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "block", sm: "block" },
                        }}
                    >
                        Modbus
                    </Typography>
                    <Box sx={{ display: { xs: "none", sm: "inline" } }}>
                        {navItems.map((item) => (
                            <Link to={item.Link}>
                                <Button
                                    key={`/${item.Header.toUpperCase()}`}
                                    sx={{ color: "#fff" }}
                                    color="primary"
                                >
                                    {item.Header}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    <Box sx={{ display: { xs: "none", sm: "block" } }}>
                        {isLogin ? (
                            <>
                                <Button
                                    key="LOGIN"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    sx={{ color: "#fff" }}
                                >
                                    ออกจากระบบ
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    key="LOGIN"
                                    onClick={() => {
                                        setOpen(true);
                                    }}
                                    sx={{ color: "#fff" }}
                                >
                                    เข้าสู่ระบบ
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: "block", sm: "none" },
                        "& .MuiDrawer-paper": {
                            boxSizing: "border-box",
                            width: drawerWidth,
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ p: 0, justifyContent: "center", display: "flex" }}
            >
                <Toolbar />
                <Typography></Typography>
            </Box>
        </Box>
    );
};

Navbar.propTypes = {
    window: PropTypes.func,
};

export default Navbar;
