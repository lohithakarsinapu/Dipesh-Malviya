import React from 'react';
import user from '../images/user.jpg';
import {Link} from 'react-router-dom';

const ContactCard = (props) => {
   // const contact=props.contact
   const {id, name, email} = props.contact; // destructuring
   
    return (     
        <div className="item" >
            <img className="ui avatar image" src={user} alt="user"></img>
            <div className="content" >
                <Link to={{pathname:`/contact/${id}`, state:{contact:props.contact}}}>
                <div className="header">{name}</div>
                <div>{email}</div>
                </Link>
                <i class="trash alternate outline icon" 
                style={{ color: "red", marginTop: "7px" }}
                onClick={() => props.clickHandler(id)}
                ></i>
     
            </div>
              </div>
            

    )
}

export default ContactCard;