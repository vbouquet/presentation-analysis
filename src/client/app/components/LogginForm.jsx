import React, {Component}   from 'react';
import ReactDOM             from 'react-dom';
import RecordingCenter      from './RecordingCenter.jsx';

class LogginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id        : null,
      firstName : "",
      lastName  : "",
      logginRedirection : false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
          <label>
            Firstname:
            <input
              name="firstName"
              type="text"
              value={this.state.firstName}
              onChange={this.handleInputChange}
            />
            Lastname:
            <input
              name="lastName"
              type="text"
              value={this.state.lastName}
              onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
}

export default LogginForm;