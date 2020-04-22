import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Container, Paper, Grid, Button } from '@material-ui/core';
import ImageUpload from './ImageUpload'
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
// const images = require.context('../public/images', true);

function hexToBase64(str) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}

class App extends React.Component {
  
  state={
    loading: false,
    image: false,
    pic: null,
  }

  handleSubmit= async ()=>{
    this.setState({loading:true})
    await axios.get("http://localhost:8000/result").then(
      (response)=>{
        console.log(response)
        this.setState({pic:response.data})
      },
      (error)=>{
        console.log(error)
      }
    )
    this.setState({loading:false,image:true})
  }

  render(){
  return (
    <div>
      <MuiAppBar position="static" style={{alignItems:'center'}}>
        <Toolbar>
          <Typography style={{fontSize:20}}>
        Make up Transfer
        </Typography>
        </Toolbar>
      </MuiAppBar>
      <Container maxWidth="lg">
        <Grid container spacing={3} style={{marginTop:50}}>
          <Grid item sm={6} xs={12}>
            <Paper elevation={1}>Original Image
            <ImageUpload key="1" type="source"/>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper elevation={1}>Makeup Image
            <ImageUpload key="2" type="makeup"/>
            </Paper>
          </Grid>

          <Grid item sm={12} xs={12} alignContent='center'>
            <Button onClick={this.handleSubmit} st>Show</Button>
          </Grid>

          <Grid item sm={12} xs={12}>
            <Paper elevation={1}>Result</Paper>
            {this.state.loading && <CircularProgress/>}
            <img src='http://localhost:8000/image' />
          </Grid>


        </Grid>
      </Container>
      </div>
  );}

}

export default App;
