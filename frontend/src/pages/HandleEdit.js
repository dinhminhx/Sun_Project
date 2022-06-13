import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import axios from 'axios';
import swal from 'sweetalert';
class HandleEdit extends Component
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

    async componentDidMount() {
        const res_id = this.props.id;
        const res = await axios.get(`http://localhost:8000/api/Edit/${res_id}`);
        if(res.data.status === 200)
        {
                
                this.setState({
                    name: res.data.restaurant.name,
                    phone:  res.data.restaurant.phone,
                    email: res.data.restaurant.email,
                    detail: res.data.restaurant.detail,
                    image: res.data.restaurant.image,
                });
        }
        else if(res.data.status === 404)
        {
            swal({
                title: res.data.message,
                text: "Please Try Again",
                icon: "warning",
                button: "Back!",
              });
        }
    }

    updateRestaurantData = async (e)=> {
        e.preventDefault();
        document.getElementById('updatebtn').disabled = true;
        document.getElementById('updatebtn').innerText="Updating";
        const res_id = this.props.id;
        const res =  await axios.put(`http://localhost:8000/api/EditDone/${res_id}`,this.state);
        if(res.data.status === 200)
         {
            swal({
                title: res.data.message,
                text: "Restaurant was successfully updated ",
                icon: "success",
                button: "Back!",
              });
             document.getElementById('updatebtn').disabled = false;
             document.getElementById('updatebtn').innerText="Updated";
         }
         else if(res.data.status === 404)
        {
            swal({
                title: res.data.message,
                text: "Please Try Again",
                icon: "warning",
                button: "Back!",
              });
        }
        else
        {
            this.setState({
                error_list: res.data.validate_err,
            })
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Edit Data
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                            <form onSubmit = {this.updateRestaurantData}>
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
                                        <input type="file" onChange={this.handleInput} name ="image" value=""  className="form-control" placeholder="Image"/>
                                        <span className="text-danger">{this.state.error_list.image}</span>
                                    </div>
                                    <div className="form-group mb-3">
                                        <button type="sumbit" id ="updatebtn" className="btn btn-primary">Submit</button>
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
export default HandleEdit;