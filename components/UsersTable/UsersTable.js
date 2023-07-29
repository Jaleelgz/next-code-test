"use client";

import * as React from "react";
import { TableVirtuoso } from "react-virtuoso";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Tooltip,
  TableHead,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

const columns = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 120,
    label: "Phone",
    dataKey: "phone",
    numeric: false,
  },
  {
    width: 200,
    label: "Email",
    dataKey: "email",
  },
  {
    width: 120,
    label: "Username",
    dataKey: "username",
    numeric: false,
  },
];

const VirtuosoTableComponents = {
  // eslint-disable-next-line
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead,
  TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
  // eslint-disable-next-line
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? "right" : "left"}
          style={{ width: column.width }}
          sx={{
            backgroundColor: "background.paper",
            fontWeight: "600",
          }}
        >
          {column.label}
        </TableCell>
      ))}
      <TableCell
        variant="head"
        align={"center"}
        style={{ width: "100px" }}
        sx={{
          backgroundColor: "background.paper",
          fontWeight: "600",
        }}
      >
        Delete
      </TableCell>
    </TableRow>
  );
}

const rowContent = (_index, row, deleteUser) => {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}

      <TableCell align={"center"}>
        <React.Fragment>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteUser(row)}>
              <Delete color="warning" />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      </TableCell>
    </React.Fragment>
  );
};

const UsersTable = ({ users, deleteUser, search }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [visibleUsers, setVisibleUsers] = React.useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const updatedRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(updatedRowsPerPage);

    setPage(0);
  };

  React.useEffect(() => {
    const startIndex = rowsPerPage * page;
    const endIndex = startIndex + rowsPerPage;

    const tempVisibleUsers = users.slice(startIndex, endIndex);

    setVisibleUsers(tempVisibleUsers);
  }, [users, rowsPerPage, page]);

  React.useEffect(() => {
    setPage(0);
  }, [search]);

  return (
    <React.Fragment>
      <Paper style={{ height: 400, width: "100%" }}>
        <TableVirtuoso
          data={visibleUsers}
          totalCount={visibleUsers.length}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={(_index, row) =>
            rowContent(_index, row, navigation, deleteUser)
          }
        />
      </Paper>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default UsersTable;
