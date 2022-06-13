import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class HandleShow extends Component
{
    state ={
        name: '',
        phone: '',
        email: '',
        detail: '',
        image: '',
        error_list:[],
    }
    async componentDidMount() {
        const res_id = this.props.id;
        const res = await axios.get(`http://localhost:8000/api/Show/${res_id}`);
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
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                <h4>Show Data
                                <Link to={'/'} className="btn btn-primary btn-sm float-end">Back</Link>
                                </h4>
                            </div>
                            <div className="card-body">
                            <div>
                                <h3>Name : {this.state.name} </h3>
                                <h4>Contact: {this.state.phone} </h4>
                                <h4>Email : {this.state.email} </h4>
                                 <b>Describe: </b>  {this.state.detail}
                            </div>
                            </div>
                        </div>
                    </div>
                    <img src={process.env.PUBLIC_URL+"/image/"+this.state.image.slice(12)} alt="" style={{maxWidth: "50%", height: "50%" ,float: "right"}}></img>
                </div>
            </div>
        );
    }
}
export default HandleShow;