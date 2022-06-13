import axios from 'axios';
import React, {Component } from 'react';
import {Link , useParams} from 'react-router-dom';
import TextareaAutosize from 'react-textarea-autosize';
import HandleShow from './HandleShow'
import { useNavigate } from 'react-router-dom';


function Show(){
    const {id} = useParams();
    return(<HandleShow id={id}></HandleShow>);
}
export default Show;