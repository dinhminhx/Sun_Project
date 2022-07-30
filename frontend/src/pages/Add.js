import React,{Component} from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import swal from 'sweetalert';

class Add extends Component
{
    state ={
        formData: {
            name: '',
            phone: '',
            email: '',
            detail: '',
            image: '',
        },
        error_list:[],
    }

    handleInput = (e)=> {
        this.setState({
           formData: {
                ...this.state.formData,
                [e.target.name] : e.target.value
           }
        });
    }
    handleImage = (e)=> {
        this.setState({
            formData: {
                ...this.state.formData,
                image : e.target.files[0]
           }
        });
    }

    saveRestaurantData = async (e)=> {
        e.preventDefault();
        const formData = new FormData(); 
        formData.append( 
            "image", 
            this.state.formData.image, 
            this.state.formData.image.name 
        ); 
        
        Object.keys(this.state.formData).forEach(key=> {
            if(key!=="image")
                {
                    formData.append( 
                        key, 
                        this.state.formData[key],
                    ); 
                }
        });
        const res =  await axios.post('http://localhost:8000/api/Add',formData);
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
                                        <input type="text" onChange={this.handleInput}  name ="name" value={this.state.formData.name} className="form-control" placeholder="Restaurant Name"/>
                                        <span className="text-danger">{this.state.error_list.name}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Phone</label>
                                        <input type="text" onChange={this.handleInput} name ="phone" value={this.state.formData.phone} className="form-control" placeholder="Phone"/>
                                        <span className="text-danger">{this.state.error_list.phone}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Email</label>
                                        <input type="text" onChange={this.handleInput} name ="email" value={this.state.formData.email}  className="form-control" placeholder="Email"/>
                                        <span className="text-danger">{this.state.error_list.email}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Details</label>
                                        <TextareaAutosize type="text" onChange={this.handleInput} name ="detail" value={this.state.formData.detail}  className="form-control" placeholder="Detail" />
                                        <span className="text-danger">{this.state.error_list.detail}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Restaurant Image</label>
                                        <input type="file" onChange={this.handleImage} name ="image" value={this.state.formData.image.value}  className="form-control"/>
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