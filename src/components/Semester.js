import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST, SERVER_URL} from '../constants.js'
import AddStudent from "./AddStudent";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import {toast} from "react-toastify";

// user selects from a list of (year, semester) values
export default class Semester extends Component {
    constructor(props) {
        super(props);
        this.state = {selected: SEMESTER_LIST.length - 1, addedStudent: false};
    }

    onRadioClick = (event) => {
        console.log("Semester.onRadioClick " + JSON.stringify(event.target.value));
        this.setState({selected: event.target.value});
    }

    addStudent = (student) => {
        const token = Cookies.get('XSRF-TOKEN');

        fetch(`${SERVER_URL}/student`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': token
                },
                body: JSON.stringify(student)
            })
            .then(res => {
                if (res.ok) {
                    toast.success("Student successfully added", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                } else {
                    toast.error("Error when adding", {
                        position: toast.POSITION.BOTTOM_LEFT
                    });
                    console.error('Post http status =' + res.status);
                }
            })
            .catch(err => {
                    console.error(err);
                }
            )
    }

    render() {
        const icolumns = [
            {
                field: 'id',
                headerName: 'Year',
                width: 200,
                renderCell: (params) => (
                    <div>
                        <Radio
                            checked={params.row.id === this.state.selected}
                            onChange={this.onRadioClick}
                            value={params.row.id}
                            color="default"
                            size="small"
                        />
                        {SEMESTER_LIST[params.row.id].year}
                    </div>
                )
            },
            {field: 'name', headerName: 'Semester', width: 200}
        ];

        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" color="inherit">
                            Schedule - select a term
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div align="left">
                    <div style={{height: 400, width: '100%', align: "left"}}>
                        <DataGrid rows={SEMESTER_LIST} columns={icolumns}/>
                    </div>
                    <Button component={Link}
                            to={{
                                pathname: '/schedule',
                                year: SEMESTER_LIST[this.state.selected].year,
                                semester: SEMESTER_LIST[this.state.selected].name
                            }}
                            variant="outlined" color="primary" style={{margin: 10}}>
                        Get Schedule
                    </Button>
                    <AddStudent addStudent={this.addStudent}/>
                </div>
            </div>
        )
    }
}
