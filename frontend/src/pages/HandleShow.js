import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
class HandleShow extends Component
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
    async componentDidMount() {
        const res_id = this.props.id;
        const res = await axios.get(`http://localhost:8000/api/Show/${res_id}`);
        if(res.data.status === 200)
        {
                this.setState({
                    formData: {
                        ...res.data.restaurant
                    }
                })
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
                                <h3>Name : {this.state.formData.name} </h3>
                                <h4>Contact: {this.state.formData.phone} </h4>
                                <h4>Email : {this.state.formData.email} </h4>
                                 <b>Describe: </b>  {this.state.formData.detail}
                            </div>
                            </div>
                        </div>
                    </div>
                    <img src={"http://localhost:8000/"+this.state.formData.image} alt="" style={{maxWidth: "50%", height: "50%" ,float: "right"}}></img>
                </div>
            </div>
        );
    }
}
export default HandleShow;