import React, { Component } from 'react';
import { API_URL } from "../constants";
import axios from "axios";
import { Table,FormGroup,Input,Label } from "reactstrap";


class Search extends Component {
    token = null;
    state = {
      query: "",
      student: []
    };
  
    onChange = e => {
      const { value } = e.target;
      this.setState({
        query: value
      });
  
      this.search(value);
    };
  
    
  
    componentDidMount() {
      this.search("");
    }
    search = query => {
    axios.get(API_URL+ query)
  .then((response) => {
    console.log(response.data);
    this.setState({student: response.data})
  });
}

    render() {
      return (
        <FormGroup>
          <Label><b>Search Box</b></Label>
          <Input
            type="text"
            className="search-box"
            placeholder="Search By Roll No ..."
            onChange={this.onChange}
          />
          {/* {this.student.map(student => (
            <ul key={student.roll_no}>
              <li>{student.name}</li>
            </ul>
          ))} */}
          {/* {this.state.query} */}
        <Table dark>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Maths</th>
            <th>Physics</th>
            <th>Chemistry</th>
            <th>Total</th>
            <th>Percent</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
            <tr>
            <td>{this.state.student.roll_no}</td>
            <td>{this.state.student.name}</td>
            <td>{this.state.student.marks_maths}</td>
            <td>{this.state.student.marks_physics}</td>
            <td>{this.state.student.marks_chem}</td>
            <td>{this.state.student.marks_total}</td>
            <td>{this.state.student.percent}</td>
            </tr>
        </tbody>
        </Table>
        </FormGroup>
      );
    }
  }

  export default Search;