import React, { Component } from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

import Template from '../components/template'
import SimpleTable from '../components/simpleTable'
import Form from '../components/form'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

export default class Index extends Component {
  constructor(props) {
    super(props)
    this.refreshTable = this.refreshTable.bind(this)
    this.showTable = this.showTable.bind(this)
    this.state = { dataTable: null }
  }
  makeStyles(theme: Theme) {
    return createStyles({
      button: {
        margin: theme.spacing(1)
      },
      input: {
        display: 'none'
      },
      link: {
        margin: theme.spacing(1)
      }
    })
  } //
  async refreshTable() {
    const response = await axios.get('http://localhost:3001/users')
    this.setState({ dataTable: response.data })
    this.showTable()
  }
  componentWillMount() {
    this.refreshTable()
  }
  showTable() {
    this.setState({ cadastrar: false })
  }

  render() {
    return (
      <>
        <Template>
          <Button variant="contained" className={makeStyles.button}>
            <Link href="/cadastro" className={makeStyles.link}>
              Novo Cadastro
            </Link>
          </Button>
          <SimpleTable
            data={this.state.dataTable}
            exibir={true}
            refresh={this.refreshTable}
          />
        </Template>
      </>
    )
  }
}
