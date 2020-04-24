import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Container, Paper, Grid, Button } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { grey } from '@material-ui/core/colors';
// const images = require.context('../public/images', true);


class App extends React.Component {
  
  state={
    loading: false,
    image: false,
    key: ''
  }

  handleSubmit= async ()=>{
    this.setState({loading:true})
    var self = this
    await axios.get("http://localhost:8000/result").then(
      (response)=>{
        console.log(response)
        self.setState({image:true,loading:false,key:self.state.key+'1'})
      },
      (error)=>{
        alert('Upload Images first')
      }
    )
    this.setState({loading:false,image:true})
  }

  render(){
  return (
    <div style={{height: '100vh'}}>
      <MuiAppBar position="static" style={{alignItems:'center'}}>
        <Toolbar>
          <Typography style={{fontSize:20}}>
        Make up Transfer
        </Typography>
        </Toolbar>
      </MuiAppBar>
      <Container maxWidth="lg">
          <Paper elevation={3} style={{padding:10,marginTop:50}}>
        <Grid container justify="center" style={{flexGrow: 1}} spacing={3}>
          <Grid item sm={6} xs={12}>
            <Paper elevation={0}>Original Image
            <ImageUpload key="1" type="source"/>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper elevation={0}>Makeup Image
            <ImageUpload key="2" type="makeup"/>
            </Paper>
          </Grid>

          <Grid item sm={12} xs={12} alignContent='center'>
            <Button onClick={this.handleSubmit} st>Show</Button>
          </Grid>

          <Grid item sm={6} xs={6}>
            <Paper elevation={0}>
            {this.state.loading && <CircularProgress/>}
            {this.state.image && <img key={this.state.key} src={'http://localhost:8000/image'} />}
            </Paper>
          </Grid>


        </Grid>
        </Paper>
      </Container>
      </div>
  );}

}

export default App;
