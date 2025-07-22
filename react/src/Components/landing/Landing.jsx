import { useCallback, useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { backendUrl, translate } from "../../main";
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

const Landing = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  const handleGoogleAuth = useCallback(() => {
    const auth = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}auth/google/redirect`);
        window.location.href = res.data;
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    auth();
  }, []);

  const element = useMemo(() => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <AppBar position="sticky">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Stack
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack
                  sx={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <img src="/logo.png" alt="TASK Logo" />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: "900",
                    }}
                  >
                    TASK
                  </Typography>
                </Stack>
                <Stack
                  sx={{
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {loading ? (
                    <CircularProgress size={20} color="secondary" />
                  ) : (
                    <Button
                      onClick={handleGoogleAuth}
                      variant="contained"
                      color="secondary"
                      size="small"
                      startIcon={<GoogleIcon />}
                    >
                      {translate("get start with google")}
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>
        <Box
          sx={{
            display: "grid",
            placeContent: "center",
            flexGrow: 1,
            background:
              "radial-gradient(ellipse at center, rgba(255,254,234,1) 0%, rgba(255,254,234,1) 35%, #B7E8EB 100%)",
          }}
        >
          <div className="ocean">
            <div className="wave"></div>
            <div className="wave"></div>
          </div>

          <p dir={theme.direction} className="cursor typewriter-animation">
            {translate("best way to handle your daily tasks.")}
          </p>
        </Box>
      </Box>
    );
  }, [handleGoogleAuth, loading, theme.direction]);
  return element;
};

export default Landing;
