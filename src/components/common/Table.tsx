/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useState, useEffect } from 'react'
import MaterialTable, { Action, Column, Components, MaterialTableProps, Options } from 'material-table'
import { makeStyles } from '@material-ui/core'

const useStyle = makeStyles(() => ({
  root: {
    marginTop: 20,
    overflow: 'scroll',
    '& .MuiPaper-root': {
      borderRadius: '10px',
      border: '0px !important',
      boxShadow: 'none'
    },
    '& .MuiTable-root': {
      '& .MuiTableHead-root': {
        backgroundColor: '#E5E7E8',
        '& .MuiTableRow-root': {
          padding: 0,
          borderRadius: '100px !important',
          borderBottom: '0px !important',
          '& .MuiTableCell-paddingNone': {
            display: 'none'
          },
          '& .MuiTableCell-root': {
            borderBottom: '0px !important'
          }
        }
      },
      '& .MuiTableBody-root': {
        'tr td:first-child': {
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          borderRight: 'none'
        },
        '& .MuiTableRow-root': {
          padding: 0,
          borderBottom: '0px !important',
          'td::first-child': {
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
            borderRight: 'none'
          },
          '&:nth-of-type(even)': {
            backgroundColor: '#F3F6F8'
          },
          '& .MuiTableCell-root': {
            borderBottom: '0px !important'
          },
          '& .MuiTableCell-paddingNone': {
            // display: 'none'
            margin: 10
          }
        }
      }
    }
  }
}))

// type EditableAction<RowData extends object> = {
//   isEditable?: (rowData: RowData) => boolean
//   isDeletable?: (rowData: RowData) => boolean
//   onRowAdd?: (newData: RowData) => Promise<void | RowData | RowData[]>
//   onRowUpdate?: (newData: RowData, oldData?: RowData) => Promise<void | RowData | RowData[]>
//   onRowDelete?: (oldData: RowData) => Promise<void | RowData | RowData[]>
// }

interface TableProps<T extends object> extends MaterialTableProps<T> {
  actions?: (Action<T> | ((rowData: T) => Action<T>))[]
  isLoading?: boolean | false
  columns: Column<T>[]
  data: T[]
  option?: Options<T>
  // handleEditable?: EditableAction<T>
  components?: Components | undefined
  onSearchChange?: (searchText: string) => void
  onOrderChange?: (orderBy: number, orderDirection: 'asc' | 'desc') => void
}

export const Table = <T extends object>({
  actions,
  columns,
  data,
  option,
  components,
  onSearchChange,
  isLoading,
  onOrderChange,
  editable
}: TableProps<T>) => {
  const classes = useStyle()
  const [tableData, setTableData] = useState(data)
  const [tableColumns] = useState<Column<T>[]>(columns)

  const options = {
    ...option,
    search: false,
    paging: false,
    sorting: false,
    emptyRowsWhenPaging: false,
    headerStyle: {
      backgroundColor: '#E5E7E8',
      color: '#3B3A3C'
    },
    rowStyle: {
      ':nth-of-type(even)': {
        backgroundColor: '#F3F6F8'
      },
      borderRadius: 100
    }
  }

  useEffect(() => {
    setTableData(data)
  }, [data])

  return (
    <div className={classes.root}>
      <MaterialTable
        isLoading={isLoading}
        style={{ overflow: 'visible' }}
        actions={actions}
        editable={editable}
        onOrderChange={onOrderChange}
        columns={tableColumns}
        data={tableData}
        options={options}
        title=""
        components={components}
        onSearchChange={onSearchChange}
      />
    </div>
  )
}
