import React, { Component } from 'react'
import './JSONEntrySidebarContent.css'
import { connect } from 'react-redux';
import { replaceNodeList } from '../redux/actions'
import { func } from 'prop-types';

export class JSONEntrySidebarContent extends Component {
    constructor(props) {
        super(props)
        this.state = { valid: true, layoutJSON: "" , invalidJSONError: ""}
        this.handleReset = this.handleReset.bind(this)
        this.handleClear = this.handleClear.bind(this)
        this.handleDownload = this.handleDownload.bind(this)
    }

    componentDidMount() {
        if (this.state.layoutJSON !== this.props.nodes) {
            this.handleReset()
        }
    }

    handleReset() {
        this.setState({ layoutJSON: JSON.stringify(this.props.nodes, null, 1), valid: true })
    }


    handleSubmit(e) {
        let validatedJSON

        try {
            validatedJSON = JSON.parse(this.state.layoutJSON)
        } catch (e) {
            this.setState({valid: false, invalidJSONError: "Invalid JSON syntax"})
            return
        }
        
        if (!validatedJSON.length) {
            this.setState({ valid: false, invalidJSONError: "Enter at least 1 node" })
            return
        } 
        
        const requiredKeys = ["id", "elementType", "distribution", "distributionParameters", "numberOfActors", "queueType", "priorityFunction", "children"];
        console.log(this.state.valid);
       
        for (let i = 0; i < validatedJSON.length; i++) {
            let node = validatedJSON[i]
    
            let hasAllProps = requiredKeys.every(function(item){
                return node.hasOwnProperty(item);
            });
            
            if (!hasAllProps) {
                
                this.setState({ valid: false, invalidJSONError: "Node(s) missing a required property" })
                return
            }
        }




        if (this.state.valid) {
            this.props.replaceNodeList(validatedJSON)
        }
    }
    
    handleClear(e) {
        this.setState({ layoutJSON: "", valid: true })
    }

    handleDownload(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:json/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
    }


    render() {
        return (
            <div className="JSONEntrySidebarContent">
                <label>Layout JSON</label><br />
                <div>
                    <textarea rows="40" name="JSON_entry" value={this.state.layoutJSON} onChange={(e) => this.setState({ valid: true, layoutJSON: e.target.value.toString() })}></textarea>
                </div>
                <button className="SubmitJSONButton" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                <button className="ResetJSONButton" onClick={this.handleReset}>Reset</button>
                <button className="ClearJSONButton" onClick={this.handleClear}>Clear</button>
                <button className="ClearJSONButton" onClick={()=>this.handleDownload("nodes.json", JSON.stringify(this.props.nodes, null, 1))}>Download</button> 
                {/* TODO: give this button its own class */}
                <div className="JSONWarningContainer">
                    <label className="JSONWarningText">{this.state.valid ? "" : this.state.invalidJSONError}</label> {/* this seems to be broken now?? */}
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return { nodes: state.nodes }
}

const mapDispatchToProps = dispatch => {
    return {
        replaceNodeList: (newNodeList) =>
            dispatch(replaceNodeList(newNodeList))
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps
)(JSONEntrySidebarContent)







