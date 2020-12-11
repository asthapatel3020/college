/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'date-fns'
import parse from 'date-fns/parse'
import { Button, Grid, makeStyles, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { Column, MTableAction, MTableActions, MTableBodyRow } from 'material-table'
import React, { FC, useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { CreateButton } from '../../components/common/CreateButton'
import { Table } from '../../components/common/Table'
import { EditButton } from '../../components/common/EditButton'
// import { TableComponent } from '../../components/common/Table'
import { DateRange } from '../../components/common/Unitization/Schedule/DateRange'
import { SelectDateModal } from '../../components/common/Unitization/Schedule/SelectDateModal'
import { DragIcon, ExportIcon, SplitIcon } from '../../utils/icon'
import { scheduleDataType, scheduleData } from '../../utils/unitizationdata'
import { GenerateSchedule } from '../../components/common/Unitization/Schedule/GenerateSchedule'
import { WarningModal } from '../../components/common/Unitization/Schedule/WarningModal'
import { Input } from '../../components/common/Input'
import { CancelButton } from '../../components/common/CancelButton'
import { SubmitButton } from '../../components/common/SubmitButton'
import moment from 'moment'
const useStyles = makeStyles(() => ({
  exportCSV: {
    fontFamily: 'Merriweather-Regular',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#009AAA'
  },
  csvLink: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    marginLeft: 20
  },
  dateRangeContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  generateContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row'
  }
}))

const DragState = { row: -1, dropIndex: -1 }

export const Schedule: FC = () => {
  const classes = useStyles()
  const [edit, setEdit] = useState(false)
  const [tableData, setTableData] = useState<any[] | undefined>(scheduleData)
  const [open, setOpen] = useState(false)
  const handleModal = () => setOpen(!open)
  const [openGenerate, setOpenGenerate] = useState(false)
  const handleGenerateModal = () => setOpenGenerate(!openGenerate)
  const [openWarn, setWarn] = useState(false)
  const handleWarneModal = () => setOpenGenerate(!openWarn)
  const [startDate, setStartDate] = useState<string>(moment(new Date()).format('DD MMM yyyy'))
  const [endDate, setEndDate] = useState<string>(moment(new Date()).add(1, 'y').format('DD MMM yyyy'))

  const offsetIndex = (from: number, to: number, arr: any[] | undefined) => {
    if (arr) {
      if (from < to) {
        let start = arr.slice(0, from),
          between = arr.slice(from + 1, to + 1),
          end = arr.slice(to + 1)
        return [...start, ...between, arr[from], ...end]
      }
      if (from > to) {
        let start = arr.slice(0, to),
          between = arr.slice(to, from),
          end = arr.slice(from + 1)
        return [...start, arr[from], ...between, ...end]
      }
    }
  }

  const reOrderRow = (from: number, to: number) => {
    let newTableData = offsetIndex(from, to, tableData)
    //Update react state
    setTableData(newTableData)
  }

  const actions = [
    {
      icon: () => (
        <Grid container justify="center" direction="row" alignItems="center">
          <DragIcon color="secondary" />
        </Grid>
      ),
      tooltip: 'Drag',
      onClick: (_event: any, rowData: any) => {
        if (!Array.isArray(rowData)) console.log(rowData)
      }
    },
    {
      icon: () => (
        <Grid container justify="center" direction="row" alignItems="center">
          <SplitIcon color="secondary" />
        </Grid>
      ),
      tooltip: 'Split',
      onClick: (_event: any, rowData: any) => {
        if (!Array.isArray(rowData)) console.log(rowData)
      }
    }
  ]

  const columns: Column<scheduleDataType>[] = [
    {
      title: 'Unit Code',
      field: 'unitCode',
      cellStyle: {
        fontFamily: 'Lato-Regular',
        color: '#3B3A3C',
        fontWeight: 'bold',
        fontStyle: 'normal'
      },
      editable: 'never',
      headerStyle: {
        fontFamily: 'Lato-Regular',
        fontWeight: 'bold',
        fontStyle: 'normal'
      }
    },
    {
      title: 'Subject Code',
      field: 'subjectCode',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Regular',
        color: '#3B3A3C',
        fontWeight: 'bold',
        fontStyle: 'normal'
      },
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {rowData.subjectCode ? rowData.subjectCode : ' -'}
          </Grid>
        </Grid>
      )
    },
    {
      title: 'Unit Name',
      field: 'unitName',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      }
    },
    {
      title: 'Essentials',
      field: 'essential',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {rowData.essential ? rowData.essential : ' -'}
          </Grid>
        </Grid>
      )
    },
    {
      title: 'Duration',
      field: 'unitHours',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      editComponent: (props) => (
        <Input
          autoComplete={'off'}
          fullWidth
          id="duration"
          label="duration"
          name="duration"
          required
          adornmentPosition="end"
          adornment={'Hours'}
          value={props.value}
          placeholder="Eg: 100"
          textFieldBreakpoints={{ xs: 12 }}
          onChange={(e) => props.onChange(e.target.value)}
        />
      ),
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {rowData.unitHours + ' Hours'}
          </Grid>
        </Grid>
      )
    },
    {
      title: 'Start Date',
      field: 'startDate',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {moment(parse(rowData.startDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy')}
          </Grid>
        </Grid>
      )
    },
    {
      title: 'End Date',
      field: 'endDate',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {moment(parse(rowData.endDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy')}
          </Grid>
        </Grid>
      )
    },
    {
      title: 'Intake End Date',
      field: 'intakeEndDate',
      editable: 'never',
      cellStyle: {
        fontFamily: 'Lato-Light',
        color: '#3B3A3C',
        fontWeight: 'normal',
        fontStyle: 'normal'
      },
      render: (rowData: scheduleDataType) => (
        <Grid container style={{ marginTop: 6, marginBottom: 6, marginLeft: 1 }} spacing={2}>
          <Grid container direction="row">
            {moment(parse(rowData.intakeEndDate, 'dd/MM/yyyy', new Date())).format('DD MMM yyyy')}
          </Grid>
        </Grid>
      )
    }
  ]

  return (
    <>
      <Grid spacing={4} style={{ marginTop: 10 }}>
        <Table
          //   isLoading={loading}
          option={{ toolbar: true, actionsColumnIndex: -1 }}
          editable={{
            onBulkUpdate: (changes) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /* setData([...data, newData]); */
                  setEdit(false)
                  // startDate + (unitHours/20)*7 - 1"
                  setTableData((prev) => {
                    if (tableData) {
                      const dataUpdate = [...tableData]
                      for (const [key, value] of Object.entries(changes)) {
                        console.log(value)
                        const hour = (parseInt(value.newData.unitHours) / 20) * 7 - 1
                        const index = value.oldData.tableData.id
                        value.newData.endDate = moment(parse(value.newData.startDate, 'dd/MM/yyyy', new Date()))
                          .add(hour, 'hours')
                          .format('DD/MM/yyyy')
                        // console.log(value.newData)
                        dataUpdate[index] = value.newData
                      }
                      return [...dataUpdate]
                    }
                  })
                  resolve()
                }, 1000)
              })
          }}
          // actions={actions}
          components={{
            Row: (props) => (
              <MTableBodyRow
                {...props}
                draggable={'true'}
                onDragStart={() => {
                  console.log('onDragStart')
                  DragState.row = props.data.tableData.id
                }}
                onDragEnter={(e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  if (props.data.tableData.id != DragState.row) {
                    DragState.dropIndex = props.data.tableData.id
                  }
                }}
                onDragEnd={() => {
                  console.log(`onDragEnd`)
                  if (DragState.dropIndex != -1) {
                    reOrderRow(DragState.row, DragState.dropIndex)
                  }
                  DragState.row = -1
                  DragState.dropIndex = -1
                }}
              />
            ),
            Action: (props) => {
              if (edit) {
                if (props.action.tooltip === 'Split') {
                  return (
                    <Button
                      onClick={(event) => props.action.onClick(event, props.data)}
                      color="primary"
                      variant="contained"
                      style={{ textTransform: 'none' }}
                      size="small"
                    >
                      Test
                    </Button>
                  )
                } else {
                  return <MTableAction></MTableAction>
                }
              } else {
                return <></>
              }
            },
            Toolbar: (props) => (
              <Grid
                container
                direction="row"
                justify="space-between"
                style={{ overflow: 'scroll', flex: 1, marginBottom: '1rem' }}
              >
                <Grid item xs={5} sm={5} className={classes.dateRangeContainer}>
                  <DateRange startDate={startDate} endDate={endDate} onClick={handleModal} />
                  <CSVLink
                    data={[]}
                    className={classes.csvLink}
                    filename={'Unitization'}
                    style={{ marginLeft: 10, textTransform: 'none' }}
                  >
                    <ExportIcon style={{ marginTop: 9, fontSize: 21 }} />
                    <Typography variant="subtitle2" className={classes.exportCSV}>
                      Export .csv
                    </Typography>
                  </CSVLink>
                </Grid>
                <Grid xs={7} sm={7} className={classes.generateContainer}>
                  {edit ? (
                    <>
                      {' '}
                      <Grid item xs={2} sm={2}>
                        <CancelButton
                          label="Cancel"
                          onPress={() => {
                            setEdit(false)
                            props.actions[2].onClick(props.data)
                          }}
                        />
                      </Grid>
                      <Grid item xs={2} sm={2} style={{ marginLeft: 20 }}>
                        <SubmitButton
                          label="Save"
                          onPress={(e) => {
                            setEdit(false)
                            props.actions[1].onClick(e, props.data)
                            // setTableData(props.data)
                          }}
                        ></SubmitButton>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={2} sm={2}>
                        <EditButton
                          onClick={(e) => {
                            props.actions[0].onClick(e, props.data)
                            setEdit(true)
                          }}
                        />
                      </Grid>
                      <Grid item xs={4} sm={4} style={{ marginLeft: 20 }}>
                        <CreateButton
                          label="Generate Schedule"
                          onClick={handleGenerateModal}
                          startIcon={<Add />}
                        ></CreateButton>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Grid>
            )
          }}
          columns={columns}
          data={tableData ? tableData : []}
        />
      </Grid>
      <SelectDateModal
        open={open}
        onCloseModal={handleModal}
        onView={(startDate: string, endDate: string) => {
          setStartDate(startDate)
          setEndDate(endDate)
          setOpen(!open)
        }}
      />
      <GenerateSchedule
        open={openGenerate}
        onCloseModal={handleGenerateModal}
        handleWarningModal={(startDate: string) => {
          setOpenGenerate(!openGenerate)
          setWarn(!openWarn)
        }}
      />
      <WarningModal
        open={openWarn}
        onCloseModal={handleWarneModal}
        sendResult={(accept: boolean) => {
          setWarn(!openWarn)
        }}
      />
    </>
  )
}
