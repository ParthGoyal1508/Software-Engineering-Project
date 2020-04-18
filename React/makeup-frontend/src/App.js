import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiAppBar from '@material-ui/core/AppBar';
import { Toolbar, Typography, Container, Paper, Grid, Button } from '@material-ui/core';
import ImageUpload from './ImageUpload'

function App() {
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
            <ImageUpload/>
            </Paper>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Paper elevation={1}>Makeup Image
            <ImageUpload/>
            </Paper>
          </Grid>

          <Grid item sm={12} xs={12} alignContent='center'>
            <Button st>Show</Button>
          </Grid>

          <Grid item sm={12} xs={12}>
            <Paper elevation={1}>Result</Paper>
          </Grid>


        </Grid>
      </Container>
      </div>
  );
}

export default App;
