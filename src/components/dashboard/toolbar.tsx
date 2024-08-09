import { Box } from "@mui/material";
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { ExtendedCol } from "../../services/db/columns";
import ShareMenu from "./share-menu";

type ToolbarProps = {
  columns: ExtendedCol[];
};

function Toolbar(_: ToolbarProps) {
  return (
    <GridToolbarContainer>
      <Box sx={{ color: (theme) => theme.palette.primary.main }}>
        <h2 style={{ paddingInlineStart: 10 }}>FMCSA Dashboard</h2>
      </Box>
      <Box sx={{ flex: 1 }}></Box>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <ShareMenu />
      <GridToolbarQuickFilter variant="outlined" size="small" />
    </GridToolbarContainer>
  );
}

export default Toolbar;