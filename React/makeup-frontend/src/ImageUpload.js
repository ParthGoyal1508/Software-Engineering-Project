import React from 'react';
import './ImageUpload.css'
import axios from 'axios';

export default class ImageUpload extends React.Component {
    constructor(props) {
      super(props);
      this.state = {file: '',imagePreviewUrl: ''};
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      var formdata = new FormData()
      formdata.append("file",this.state.file)

      if(this.props.type==="source"){
      axios.post("http://localhost:8000/source",formdata,{headers:{'Content-Type': 'multipart/form-data'}}).then(
        (response)=>{
          console.log("source")
          alert(response.data)
        },
        (error)=>{
          console.log(error)
        }
      )}
      else{
        axios.post("http://localhost:8000/makeup",formdata,{headers:{'Content-Type': 'multipart/form-data'}}).then(
          (response)=>{
          console.log("makeup")
          alert(response.data)
          },
          (error)=>{
            console.log(error)
          }
        ) 
      }
    }
  
    _handleImageChange(e) {
      e.preventDefault();
  
      let reader = new FileReader();
      let file = e.target.files[0];
  
      reader.onloadend = () => {
        this.setState({
          file: file,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
    }
  
    render() {
      let {imagePreviewUrl} = this.state;
      let $imagePreview = null;
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />);
      } else {
        $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
      }
  
      return (
        <div className="previewComponent">
          <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
              type="file" 
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
          </form>
        </div>
      )
    }
  }