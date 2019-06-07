import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import Template from '../components/template'
import Form from '../components/form'

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500
  }
})

export default class Cadastro extends Component {
  render() {
    return (
      <Template>
        <Typography variant="h3" component="h1" gutterBottom>
          Cadastro de Usuario
        </Typography>
        <Form />
      </Template>
    )
  }
}
