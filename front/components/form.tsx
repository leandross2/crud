import React from 'react'
import axios from 'axios'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '100%'
    },
    dense: {
      marginTop: theme.spacing(2)
    },
    menu: {
      width: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: '99%'
    },
    selectField: {
      width: '100%'
    },
    button: {
      margin: theme.spacing(1)
    },
    input: {
      display: 'none'
    },
    error: {
      backgroundColor: theme.palette.error.dark
    }
  })
)
interface Field {
  value: string
  error: boolean
}
interface FieldState {
  email: Field
  name: Field
  role: Field
  external_code: Field
  tags: Field
}
interface Field {
  errorMessage: string
  field: string
}
interface Alert {
  open: boolean
  message: string
}

function Form(props) {
  const classes = useStyles()
  const [values, setValues] = React.useState<State>({
    edit: false,
    email: {
      value: '',
      error: false
    },
    name: { value: '', error: false },
    role: { value: '', error: false },
    external_code: { value: '', error: false },
    tags: { value: '', error: false }
  })
  const getUserById = async id => {
    if (!values.edit) {
      const res = await axios.get(`http://localhost:3001/users/${id}`)
      setValues({
        edit: true,
        email: {
          value: res.data.data.email,
          error: false
        },
        name: { value: res.data.data.name, error: false },
        role: { value: res.data.data.role, error: false },
        external_code: { value: res.data.data.external_code, error: false },
        tags: { value: res.data.data.tags.join(','), error: false }
      })
    }
  }

  if (props.id) {
    getUserById(props.id)
  }

  const [alertBox, setAlertBox] = React.useState<Alert>({
    open: false,
    message: ''
  })

  const handleChange = (name: keyof FieldState) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({
      ...values,
      [name]: { value: event.target.value, error: false }
    })
  }
  const validFields = async () => {
    props.showTable()
  }

  const sendForm = async () => {
    const fields = {
      email: values.email.value,
      name: values.name.value,
      role: values.role.value,
      external_code: values.external_code.value,
      tags: values.external_code.value.split(',')
    }
    return await axios.post(`http://localhost:3001/users`, fields)
  }
  const updateForm = async () => {
    const fields = {
      email: values.email.value,
      name: values.name.value,
      role: values.role.value,
      external_code: values.external_code.value,
      tags: values.external_code.value.split(',')
    }
    return await axios.patch(`http://localhost:3001/users/${props.id}`, fields)
  }

  const handleSubmit = async event => {
    let res = ''
    if (props.id) res = await updateForm()
    else res = await sendForm()
    if (res.data.type === 'error') {
      const err = res.data.data.errors
      const field = Object.keys(err)
      setValues({ ...values, [field]: { error: true } })
      const msg = `o csampo ${field}: ${err[field].join(',')}`
      openAlertBox(msg)
      return false
    }
    openAlertBox('Usuario cadastrado com sucesso!')
    resetFields()
  }
  function resetFields() {
    setValues({
      email: { value: '', error: false },
      name: { value: '', error: false },
      role: { value: '', error: false },
      external_code: { value: '', error: false },
      tags: { value: '', error: false }
    })
  }
  function openAlertBox(msg) {
    setAlertBox({ ...alertBox, open: true, message: msg })
  }

  function handleClose(event, reason) {
    setAlertBox({ ...alertBox, open: false, message: '' })
  }
  return (
    <>
      <form
        enctype="application/json"
        className={classes.container}
        autoComplete="off"
      >
        <TextField
          id="field-email"
          label="E-mail"
          value={values.email.value}
          error={values.email.error}
          onChange={handleChange('email')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="email"
        />
        <TextField
          id="field-email"
          label="Nome"
          error={values.name.error}
          value={values.name.value}
          onChange={handleChange('name')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="name"
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Função</InputLabel>
          <Select
            native
            error={values.role.error}
            value={values.role.value}
            onChange={handleChange('role')}
            input={<OutlinedInput name="role" id="field-role" />}
          >
            <option value="" />
            <option value="1">Gestor</option>
            <option value="2">Agente</option>
            <option value="3">Local</option>
          </Select>
        </FormControl>
        <TextField
          id="field-external-code"
          label="Codigo externo"
          onChange={handleChange('external_code')}
          error={values.external_code.error}
          value={values.external_code.value}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="external_code"
        />
        <TextField
          id="field-tags"
          label="Tags"
          onChange={handleChange('tags')}
          error={values.tags.error}
          value={values.tags.value}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          name="tags"
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          className={makeStyles.button}
        >
          Salvar
        </Button>
      </form>
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
}
export default Form
