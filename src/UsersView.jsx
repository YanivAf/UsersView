import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';

import axios from 'axios';

export default function UsersView() {
  
  const [rowsState, setRowsState] = useState({
    page: 0,
    pageSize: 10,
    rows: [],
    loading: false,
  });

  const [allRows, setAllRows] = useState(
    JSON.parse(localStorage.getItem('allRows')) ?
    JSON.parse(localStorage.getItem('allRows')) :
    []
  );

  const columns = [
    {
      field: 'userUrl',
      headerName: 'View',
      renderCell: (params) => { return (
        <IconButton
          aria-label="info"
          href={`/users/${params.value}`}>
          <InfoOutlinedIcon />
        </IconButton>
      );},
      width: 75
    },
    {
      field: 'picture',
      headerName: 'Picture',
      renderCell: (params) =>  <Avatar src={params.value.srcTN} alt={params.value.alt} title={params.value.alt} />,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      width: 200
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 250
    },
    {
      field: 'gender',
      headerName: 'Gender'
    },
    {
      field: 'age',
      headerName: 'Age'
    },
  ];
  
  const handleReset = () => {
    window.localStorage.clear();
    window.location.reload(false);
  }
  useEffect(() => {
    let active = true;

    (async () => {
      try {
        const updatedAllRows = [...allRows];
        if (allRows.length <= rowsState.page * rowsState.pageSize) {
        setRowsState((prev) => ({ ...prev, loading: true }));
          const { data } = await axios.get("https://randomuser.me/api/?results=10");

          if (!active) return;

          data.results.forEach(user => updatedAllRows.push(
            {
              id: user.login.uuid,
              userUrl: `${user.name.title}-${user.name.first}-${user.name.last}`,
              picture: {
                srcTN: user.picture.thumbnail,
                srcL: user.picture.large,
                alt: `${user.name.title} ${user.name.first} ${user.name.last}`
              },
              fullName: `${user.name.title} ${user.name.first} ${user.name.last}`,
              email: user.email,
              gender: user.gender,
              age: user.gender,
              location: user.location
            }));
            setAllRows(updatedAllRows);
            localStorage.setItem('allRows', JSON.stringify(updatedAllRows));
            console.log(updatedAllRows)
          }
          const pageRows = (updatedAllRows.slice(rowsState.page * rowsState.pageSize, (rowsState.page + 1) * rowsState.pageSize));
          setRowsState((prev) => ({ ...prev, loading: false, rows: pageRows }));
      } catch (error) {
        console.error(error);
      }
    })();

    return () => {
      active = false;
    };
  }, [rowsState.page, rowsState.pageSize]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', rowGap: 20 }}>
      <Typography variant="h1" align="center">
        Users View
      </Typography>
      <div style={{ height: '60vh', width: '100%' }}>
        <DataGrid
            columns={columns}
            rowCount={100}
            rowsPerPageOptions={[10]}
            {...rowsState}
            paginationMode="server"
            onPageChange={(page) => setRowsState((prev) => ({ ...prev, page }))}
            onPageSizeChange={(pageSize) => setRowsState((prev) => ({ ...prev, pageSize }))}
            pagination
            nextIconButtonProps={{
                disabled: true
              }}
          />
      </div>
      <Button
        aria-label="reset"
        variant="outlined"
        startIcon={<RefreshIcon />}
        onClick={() => handleReset()}
      >
        Reset Data
      </Button>
    </div>
  );
}