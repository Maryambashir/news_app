import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box, Container, Toolbar } from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box sx={{ flex: 1 }}>
                <Container sx={{ flexGrow: 1 }}>
                    <Toolbar />
                    <Box sx={{ my: 2 }}>
                        <Outlet />
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}

export default Layout;
