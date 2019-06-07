import React from 'react'
import axios from 'axios'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto'
    },
    table: {
      minWidth: 650
    },
    cellDelete: {
      textAlign: 'right',
      color: '#000',
      fontWeight: 800,
      width: '100px',
      cursor: 'pointer'
    },
    cellEmail: {
      textAlign: 'left'
    }
  })
)
interface Alert {
  open: boolean
  message: string
}
const SimpleTable = props => {
  const classes = useStyles()
  const rows = props.data

  const [alertBox, setAlertBox] = React.useState<Alert>({
    open: false,
    message: ''
  })
  function openAlertBox(msg) {
    setAlertBox({ ...alertBox, open: true, message: msg })
  }

  function handleClose(event, reason) {
    setAlertBox({ ...alertBox, open: false, message: '' })
  }
  const removeUser = async event => {
    const id = event.target.dataset.id
    const res = await axios.delete(`http://localhost:3001/users/${id}`)
    if (res.data.type === 'sucess') {
      openAlertBox('Usuario removido com sucesso!')
      props.refresh()
    }
  }
  return (
    props.data &&
    props.exibir && (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.cellDelete} align="right" />
                <TableCell className={classes.cellEmail} align="right">
                  E-mail
                </TableCell>
                <TableCell align="right">Nome</TableCell>
                <TableCell align="right">Código externo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.data.map(row => (
                <TableRow key={row.id}>
                  <TableCell
                    className={classes.cellDelete}
                    component="th"
                    scope="row"
                  >
                    <span data-id={row.id} onClick={removeUser}>
                      x
                    </span>
                  </TableCell>
                  <TableCell className={classes.cellEmail} align="right">
                    <Link
                      href={`alterar?id=${row.id}`}
                      className={classes.link}
                    >
                      {row.email}
                    </Link>
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.external_code}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={alertBox.open}
          autoHideDuration={6000}
          variant="error"
          className={classes.error}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{alertBox.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </>
    )
  )
}

export default SimpleTable
