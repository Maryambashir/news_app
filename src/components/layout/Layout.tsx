import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Box, Container, Toolbar } from "@mui/material";

const Layout = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F0F0F0'}}>
            <Header />
            <Box sx={{ flex: 1 }}>
                <Container maxWidth={false} sx={{ marginLeft: 0, marginRight: 0, background: '#FAF9F6'}}>
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
