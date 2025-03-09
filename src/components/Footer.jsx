import React from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#1a1a1a", color: "white", py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          {/* Company Info */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Cafetech
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Your trusted partner in technology and innovation.
            </Typography>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", mt: 1 }}>
              <Link href="/" color="inherit" underline="hover">
                Home
              </Link>
             
            </Box>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" fontWeight="bold">
              Follow Us
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box textAlign="center" sx={{ mt: 4, opacity: 0.7 }}>
          <Typography variant="body2">&copy; {new Date().getFullYear()} Cafetech. All rights reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
