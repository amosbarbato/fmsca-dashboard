import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, CircularProgress } from "@mui/material";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DataItem, initialRows } from "../../services/db";

import TokenService from "../../services/token";
import ColumnService, { RawCol } from "../../services/db/columns";
import useDraggableColumns from "./useDraggable";
import RecordService from "../../services/db/records";
import Toolbar from "./toolbar";
import UpdateColumnsDialog from "./update-columns";


export default function DashboardContainer() {
  const [rows, setRows] = useState<DataItem[]>(initialRows);
  const [isLoading, setLoading] = useState(false);

  const [updateData, setUpdateData] = useState<RawCol[]>([]);
  const [isOpenUpdateDialog, setOpenUpdateDialog] = useState(false);

  const {
    columns,
    columnVisibilityModel,
    refresh,
    handleResize,
    handleColumnVisibilityModelChange,
  } = useDraggableColumns();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("layout");

    if (token) {
      const data = TokenService.decode(token);
      if (data) {
        setUpdateData(data);
        setOpenUpdateDialog(true);
      }
    } else refresh();
  }, []);

  function ignoreUpdate() {
    window.location.replace(window.location.pathname);
  }
  const updateColumns = () => ColumnService.removeAllAndSave(updateData);

  const fetcher = () => {
    setLoading(true);
    RecordService.getAll()
      .then((data) => {
        if (data.length) setRows(data);
        else {
          RecordService.bulkSave(initialRows);
          setRows(initialRows);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => fetcher(), []);

  const processRowUpdate = (newRow: DataItem, oldRow: DataItem) => {
    const updatedRow = { ...oldRow, ...newRow };

    RecordService.saveOne(updatedRow);

    return updatedRow;
  };

  const handleProcessRowUpdateError = (error: unknown) => {
    console.error(error);
  };

  return (
    <Box sx={{ height: 560, width: "100%" }}>
      <DndProvider backend={HTML5Backend}>
        {isLoading ? (
          <Box
            sx={{
              minHeight: 300,
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <CircularProgress />
            <h3>fetching...</h3>
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            columnVisibilityModel={columnVisibilityModel}
            slots={{
              toolbar: (...props) => <Toolbar columns={columns} {...props} />,
            }}
            processRowUpdate={processRowUpdate}
            onProcessRowUpdateError={handleProcessRowUpdateError}
            onColumnResize={handleResize}
            onColumnVisibilityModelChange={handleColumnVisibilityModelChange}
          />
        )}
      </DndProvider>

      <UpdateColumnsDialog
        isOpen={isOpenUpdateDialog}
        handleClose={() => setOpenUpdateDialog(false)}
        ignoreUpdate={ignoreUpdate}
        updateColumns={updateColumns}
      />
    </Box>
  );
}