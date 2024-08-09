import { Box } from "@mui/material";
import Wrapper from "./wrapper";

function HomeContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "20px",
      }}
    >
      <Wrapper />
    </Box>
  );
}

export default HomeContainer;