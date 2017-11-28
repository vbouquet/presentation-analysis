import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import RecordingCenter      from './RecordingCenter.jsx';
import Button               from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';

class LogginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id        : null,
      firstName : "",
      lastName  : "",
      logginRedirection : false
    };

    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    // TODO pourquoi ça fait lagger la page web ? C'est ridicule !
    this.setState({
      [target.name]: target.value
    });
  }


  handleSubmit(event) {
    // TODO Add validation form
    console.log("handleSubmit");
    if (this.state.firstName.length > 2 && this.state.lastName.length > 2) {
      this.setState({
        logginRedirection: true
     });
      console.log("Form accepted => redirection enable");
    }

    event.preventDefault();
  }

  render() {
    if (this.state.logginRedirection)
      return <RecordingCenter />
    else {
      return (
        <form onSubmit={this.handleSubmit}>
          <FormControl>
            <InputLabel htmlFor="firstname-input">Firstname</InputLabel>
            <Input name="firstName" onChange={this.handleInputChange}
              value={this.state.firstName}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="name-input">Lastname</InputLabel>
            <Input name="lastName" onChange={this.handleInputChange}
              value={this.state.lastName}
            />
          </FormControl>

          <Button color="primary" className="submit" onClick={this.handleSubmit}>
            Log in
          </Button>
        </form>
      );
    }
  }
}

export default LogginForm;