import React from "react";
import {Link} from 'react-router-dom';

export default class AddContact extends React.Component {
    state = {
        name: "",
        email: ""
    }
     add = (e) =>{
        e.preventDefault(); // using btn so page wont refresh
        if(this.state.name === "" || this.state.email === "")
        {
            alert("all fields are mandatory");
            return;
        }
        this.props.addContactHandler(this.state);
        this.setState({name:"", email:""})

        this.props.history.push("/");
   
    }

    render() {
        return (
            <div className="ui main">
                <h2>Add Contact</h2>
                <h2>Add Contact</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Name</label>
                        <input 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        value = {this.state.name}
                        onChange={(e) => this.setState({ name: e.target.value })} 
                        />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input 
                        type="email" 
                        name="name" 
                        placeholder="Enter your email" 
                        value = {this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })} 
                        />
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
                <br/>
                <Link to="/">
                <button className="ui button blue right"><i>Back to Contact List</i></button>
            </Link>
            </div>
        );
    }
}