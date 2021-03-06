import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ValidationError from '../validationErr';
import $ from 'jquery';
import './AddNote.css';
import { observer, inject } from 'mobx-react';
@inject('valueStore')
@observer

class AddNote extends Component {

    validateForm() {
        let titleVal = $('.add-note-title').val();
        let contentVal = $('.textarea-column').val();

        if (titleVal === '' || typeof(titleVal) !== 'string') {
            this.props.valueStore.errorMsg = "Please enter a title and make sure that it is plain text.";
            return false;
        } else {
            if (contentVal === '' || typeof(contentVal) !== 'string') {
                this.props.valueStore.errorMsg = "Please enter some note content and make sure that it is plain text.";
                return false;
            } else {
                return true;
            }
        }
    }
    
    render() {
        let opts = [];
        for (let i = 0; i < this.props.valueStore.folders.length; i++) {
            opts.push(<option value={this.props.valueStore.folders[i].name} id={this.props.valueStore.folders[i].folder_id} key={Math.random(40)}>{this.props.valueStore.folders[i].name}</option>);
        }
        return (<>
        <ValidationError message={this.props.valueStore.errorMsg} />
            <form className="add-note-form">
                        <label htmlFor="add-note-title" className="add-note-title-label">
                        Note title: </label>
                        <input
                            type="text" 
                            name="add-note-title"
                            className="add-note-title" 
                            id={Math.random(4*10/2)} 
                        />
                        
                        <label htmlFor="select-note-folder" className="add-note-select-label">
                        Select folder: </label> 
                        <select name="select-note-folder" className="add-note-select">
                            {opts}
                        </select>
                          
                        <br />
                        <label htmlFor="add-note-content" className="textarea-column-label">
                        Enter your note: </label>
                        <textarea
                            name="add-note-content"
                            className="textarea-column" 
                            id={Math.random(4*10/2)} 
                        />
                         <br/>
                        <input type="submit" name="add-new-note" id={Math.random(55)} className="add-note-submit" value="Add Note" onClick={(e) => {
                            e.preventDefault();
                            $('.error').empty();
                            let isValid = this.validateForm();
                            if (isValid === true) {
                                this.props.valueStore.addNote(e);
                                this.props.history.push("/");
                            } else {
                                $('.error').append(this.props.valueStore.errorMsg);
                            }
                        }}/>
                    </form>
                    </>
                    );
                }
            }
    

export default withRouter(AddNote);