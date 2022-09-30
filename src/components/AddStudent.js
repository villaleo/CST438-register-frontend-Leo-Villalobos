import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default class AddStudent extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false, name: null, email: null};
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    setName = (event) => {
        this.setState({name: event.target.value});
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    handleAdd = () => {
        this.props.addStudent({name: this.state.name, email: this.state.email});
        this.handleClose();
    }

    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
                    Add Student
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>Add Student</DialogTitle>
                    <DialogContent style={{paddingTop: 20}}>
                        <TextField autoFocus label="Name" name="name" onChange={this.setName}/>
                        <TextField label="Email" name="email" onChange={this.setEmail}/>
                    </DialogContent>
                    <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                        <Button id="Add" color="primary" onClick={this.handleAdd}>Add</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

AddStudent.propTypes = {
    addStudent: PropTypes.func.isRequired
}
