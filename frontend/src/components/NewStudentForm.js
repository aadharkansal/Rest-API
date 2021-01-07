import React from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

import axios from "axios";

import { API_URL } from "../constants";

class NewStudentForm extends React.Component {
  state = {
    roll_no: "0",
    name: "",
    marks_maths: "0",
    marks_physics: "0",
    marks_chem: "0",
    marks_total: "0",
    percent: "0"
  };

  componentDidMount() {
    if (this.props.student) {
      const { roll_no, name, marks_maths,marks_physics,marks_chem,marks_total,percent } = this.props.student;
      this.setState({ roll_no, name, marks_maths, marks_physics, marks_chem,marks_total,percent });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  createStudent = e => {
    e.preventDefault();
    axios.post(API_URL, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  editStudent = e => {
    e.preventDefault();
    axios.put(API_URL + this.state.roll_no, this.state).then(() => {
      this.props.resetState();
      this.props.toggle();
    });
  };

  defaultIfEmpty = value => {
    return value === "" ? "" : value;
  };

  render() {
    return (
      <Form onSubmit={this.props.student ? this.editStudent : this.createStudent}>
        <FormGroup>
          <Label for="roll_no">Roll No:</Label>
          <Input
            type="text"
            name="roll_no"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.roll_no)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="name">Name:</Label>
          <Input
            type="text"
            name="name"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.name)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="marks_maths">Marks in Maths:</Label>
          <Input
            type="text"
            name="marks_maths"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.marks_maths)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="marks_physics">Marks in Physics:</Label>
          <Input
            type="text"
            name="marks_physics"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.marks_physics)}
        />
        </FormGroup>
        <FormGroup>
          <Label for="marks_chem">Marks in Chemistry:</Label>
          <Input
            type="text"
            name="marks_chem"
            onChange={this.onChange}
            value={this.defaultIfEmpty(this.state.marks_chem)}
          />
        </FormGroup>
        <Button>Add</Button>
      </Form>
    );
  }
}
console.log(NewStudentForm.roll_no)
export default NewStudentForm;