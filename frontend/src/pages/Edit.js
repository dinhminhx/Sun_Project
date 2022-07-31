import axios from 'axios';
import React, {Component } from 'react';
import {Link , useParams} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import HandleEdit from './HandleEdit'
import { useNavigate } from 'react-router-dom';


function Edit(){
    const {id} = useParams();
    const navigate = useNavigate();
    return(<HandleEdit id={id} navigate = {navigate}></HandleEdit>);
}
export default Edit;