import React,{Component} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import swal from 'sweetalert';
import {
    Redirect
  } from "react-router-dom";

class Add extends Component
{
    state ={
        name: '',
        phone: '',
        email: '',
        detail: '',
        image: '',
        error_list:[],
    }

    handleInput = (e)=> {
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    // handleImage = (e)=> {
    //     setSelectedFile([]);
    //     if(e.target.files){
    //         const fileArray = Array.from(e.target.files).map((file)=>URL.createObjectURL(file));
    //         setSelectedFile((previmage)=>previmage.concat(fileArray));
    //         Array.from(e.target.files).map(
    //             (file)=>URL.revokeObjectURL(file)
    //         );
    //     }
    // }
    saveRestaurantData = async (e)=> {
        e.preventDefault();
        // var files = e.target[0].files;
        // const formData = new FormData();
        // for(let i=0; i<files.length; i++) {
        //     formData.append('file[]',files[i]);
        // }
        const res =  await axios.post('http://localhost:8000/api/Add',this.state);
        if(res.data.status === 200)
        {
            swal({
                title: "Success",
                text: "Restaurant was successfully added ",
                icon: "success",
                button: "Back!",
              });
            this.setState({
                name: '',
                phone: '',
                email: '',
                detail: '',
                image: '',
            });
        }
        else {
            this.setState({
                error_list: res.data.validate_err,
            });
        }
    
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Add Data
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                            <form onSubmit = {this.saveRestaurantData}>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Name</label>
                                        <input type="text" onChange={this.handleInput}  name ="name" value={this.state.name} className="form-control" placeholder="Restaurant Name"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Phone</label>
                                        <input type="text" onChange={this.handleInput} name ="phone" value={this.state.phone} className="form-control" placeholder="Phone"/>
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Email</label>
                                        <input type="text" onChange={this.handleInput} name ="email" value={this.state.email}  className="form-control" placeholder="Email"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Details</label>
                                        <TextareaAutosize type="text" onChange={this.handleInput} name ="detail" value={this.state.detail}  className="form-control" placeholder="Detail" />
                                        <span className="text-danger">{this.state.error_list.detail}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Image</label>
                                        <input type="file" onChange={this.handleImage} name ="image" value={this.state.image}  className="form-control"/>
                                        <span className="text-danger">{this.state.error_list.image}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="sumbit" className="btn btn-primary">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Add;