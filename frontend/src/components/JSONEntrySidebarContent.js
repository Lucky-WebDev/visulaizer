import React, { Component } from 'react'
import './JSONEntrySidebarContent.css'

class JSONEntrySidebarContent extends Component {

    state = {
        layoutJSON: ""
    }

    sendLayout = () => {
        let x = new XMLHttpRequest();

        console.log(this.state.layoutJSON);

        if (!this.isValidJSON(this.state.layoutJSON)){
            alert("invalid JSON");
            return 
        }

        // x.open('POST', "$URI"); 
        // x.send(layoutJSON);
        
    };

    isValidJSON = (json) => {
        try {
            JSON.parse(this.state.layoutJSON);
            return true;
        } catch (e){
            return false;
        }
    };

    render() {
        return (
            <div className="JSONEntrySidebarContent">
                <label>Layout JSON</label>
                <input type="text" name="JSON_entry" onChange={(e)=> this.setState({layoutJSON : e.target.value.toString()})}></input>    
            </div>
        )
    }
}

export default JSONEntrySidebarContent