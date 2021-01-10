import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const theme = createMuiTheme({
  overrides: {
      MuiTableCell: {
          root: {  //This can be referred from Material UI API documentation. 
              padding: '7px 15px',
          },
      },
  },
});

export default function TopAnimeTrendsTable() {
  const [state] = React.useState({
    columns: [
      { title: 'Tile', field: 'title',},
      { title: 'Rating', field: 'rating' },
      { title: '% Change', field: 'percentChange'},
      { title: 'Update', field: 'update'},
    ],
    data: [
      { title: 'BOKU NO HERO ACADEMIA', rating: '8.9', percentChange: '80', update: '2020-12-17 21:22:00'},
      { title: 'NARTUO', rating: '9.3', percentChange: '70', update: '2020-12-13 21:22:00'},
      { title: 'AFRO SAMURI', rating: '8.7', percentChange: '50', update: '2020-12-11 21:22:00'},
      { title: 'ONE PUNCH MAN', rating: '9.7', percentChange: '60', update: '2020-12-14 21:22:00'},
      { title: 'BOKU NO HERO ACADEMIA', rating: '8.9', percentChange: '80', update: '2020-12-17 21:22:00'},
      { title: 'NARTUO', rating: '9.3', percentChange: '70', update: '2020-12-13 21:22:00'},
      { title: 'AFRO SAMURI', rating: '8.7', percentChange: '50', update: '2020-12-11 21:22:00'},
      { title: 'ONE PUNCH MAN', rating: '9.7', percentChange: '60', update: '2020-12-14 21:22:00'},
      { title: 'BOKU NO HERO ACADEMIA', rating: '8.9', percentChange: '80', update: '2020-12-17 21:22:00'},
      { title: 'NARTUO', rating: '9.3', percentChange: '70', update: '2020-12-13 21:22:00'},
      { title: 'AFRO SAMURI', rating: '8.7', percentChange: '50', update: '2020-12-11 21:22:00'},
      { title: 'ONE PUNCH MAN', rating: '9.7', percentChange: '60', update: '2020-12-14 21:22:00'}, 
    ],
  });

  return (
    <ThemeProvider theme={theme}>
      <MaterialTable
        title=""
        icons={tableIcons}
        columns={state.columns}
        data={state.data}
        options={{
                      fixedColumns: {
                        left: 0,
                        right: 0
                      },
                      tableLayout: 'auto',
                      pageSize: 5,
                      pageSizeOptions:[1,5,10,20],
                      rowStyle: rowData => ({ backgroundColor: rowData.tableData.checked ? '#37b15933' : '' })
                    }}
      />
    </ThemeProvider>
  );
}