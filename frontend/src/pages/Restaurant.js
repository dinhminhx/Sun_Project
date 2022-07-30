import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Restaurant.css';
import axios from 'axios';
import swal from 'sweetalert';
import Login from './Login';
class Restaurant extends Component
{
    
    state={
        restaurant:[],
        loading:true,
    }
    async componentDidMount(){
        const res = await axios.get('http://localhost:8000/api/restaurant');
        if(res.data.status === 200)
        {
            this.setState({
                restaurant: res.data.restaurant,
                loading: false,
            })
        }
    }

     deleteRestaurant = async (e,id) =>{
        const Cliked = e.currentTarget;
        Cliked.innerText="Deleting";
        const res = await axios.delete(`http://localhost:8000/api/Delete/${id}`);
        if(res.data.status ===200)
        {
            Cliked.closest('tr').remove();
            swal({
                title: "Success",
                text: "Restaurant was successfully deleted ",
                icon: "success",
                button: "Back!",
              });
        }
    }

    render() {
        var display = "";
        if(this.state.loading){
            display = <tr><td colSpan ="8">Loading...</td></tr>
        }
        else{
            display = 
            this.state.restaurant.map((item)=> {
                return (
                    <tr  key={item.id}>
                            <td>{item.id}</td>
                            <td className ="M1">{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td className ="M2 ">{item.detail}</td>
                            <td><img src={"http://localhost:8000/"+item.image} alt="" style={{maxWidth: "100%", height: "100%"}}></img></td>
                            <td>
                                <Link to={`Edit/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                            </td>
                            <td>
                                <button type="button" onClick={(e)=>this.deleteRestaurant(e,item.id)} className="btn btn-danger btn-sm"> Delete</button>
                            </td>
                            <td>
                            <Link to={`Show/${item.id}`} className="btn btn-success btn-sm">Show</Link>
                            </td>
                    </tr>
                )
            });
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h4>Restaurant Data
                                <Link to={'Add'} className="btn btn-primary btn-sm float-end">Add</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                                <table className="table table-bordered table-striped">
                                    <thead >
                                        <tr >
                                            <th>ID</th>
                                            <th >Name</th>
                                            <th>Phone Number</th>
                                            <th>Email</th>
                                            <th>Description</th>
                                            <th >Image</th>
                                            <th>Edit</th>
                                            <th>Delete</th>
                                            <th>Show</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {display}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Restaurant;