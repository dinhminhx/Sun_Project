import axios from 'axios';
import React, {Component } from 'react';
import {Link , useParams} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import HandleAdd from './HandleAdd'
import { useNavigate } from 'react-router-dom';



function Add(){
    const navigate = useNavigate();
    return(<HandleAdd navigate = {navigate}></HandleAdd>);
}
export default Add;