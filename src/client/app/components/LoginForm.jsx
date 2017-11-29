import React, {Component}              from 'react';
import ReactDOM                        from 'react-dom';
import Button                          from 'material-ui/Button';
import Input, { InputLabel }           from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Grid                            from 'material-ui/Grid';
import Paper                           from 'material-ui/Paper';
import Send                            from 'material-ui-icons/Send';

const iconStyle = {
  marginLeft: 4,
};


class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      firstName: "",
      lastName: "",
      isLoggedIn: this.props.isLoggedIn
    };

    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;

    this.setState({
      [target.name]: target.value
    });
  }


  handleSubmit(event) {
    // TODO Add validation form
    if (this.state.firstName.length > 2 && this.state.lastName.length > 2) {
      this.props.callback(this.state.firstName, this.state.lastName);
      console.log("Form accepted => redirection enable");
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
      <Paper>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={1}/>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="firstname-input">Firstname</InputLabel>
              <Input name="firstName" onChange={this.handleInputChange}
                value={this.state.firstName}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}/>

          <Grid item xs={1}/>
          <Grid item xs={10}>
            <FormControl fullWidth>
              <InputLabel htmlFor="name-input">Lastname</InputLabel>
              <Input name="lastName" onChange={this.handleInputChange}
                value={this.state.lastName}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}/>

          <Grid item xs={8}/>
          <Grid item xs={4}>
            <Button type="submit" raised color="primary">
              Login
              <Send style={iconStyle}/>
            </Button>
          </Grid>
        </Grid>
      </Paper>
      </form>
    );
  }
}

export default LoginForm;