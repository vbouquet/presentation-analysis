import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Send from 'material-ui-icons/Send';
import { login, changeMenuTitle } from '../actions';

const styles = theme => ({
  paper: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    paddingRight: 20,
  },
  iconStyle: {
    marginLeft: 4,
  }
});

const mapStateToProps = state => {
  return {
    isLoggedIn: state.userAuth.isLoggedIn,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      login: user => dispatch(login(user)),
      changeMenuTitle: title => dispatch(changeMenuTitle(title))
    }
  };
};

const propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    login: PropTypes.func.isRequired,
    changeMenuTitle: PropTypes.func.isRequired
  })
}

const defaultProps = {
  isLoggedIn: false
};

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      title: "Login - Realtime keynote analysis"
    };
    this.handleInputChange  = this.handleInputChange.bind(this);
    this.handleSubmit       = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const title = this.state.title;
    document.title = title;
    this.props.actions.changeMenuTitle(title);
  }

  handleInputChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username } = this.state;
    if (username.length > 2) {
      this.props.actions.login({ username });
    }
  }

  render() {
    const { classes } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    if (this.props.isLoggedIn) {
      return (
        <Redirect to={from} />
      )
    }
    return (
      <div className="component-login-form">
        <form onSubmit={this.handleSubmit}>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <Grid container className="login-form-grid">
          <Grid item xs={1} sm={2} md={3} xl={4} />

          <Grid item xs={10} sm={8} md={6} xl={4}>
            <Paper className={classes.paper}>

              <Grid container>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="username-input">Username</InputLabel>
                    <Input name="username" onChange={this.handleInputChange}
                          value={this.state.firstName}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="password-input">Password</InputLabel>
                    <Input name="password" type="password"/>
                  </FormControl>
                </Grid>

                <Grid item xs={1} sm={4} md={8} xl={9} />
                <Grid item xs={11} sm={8} md={4} xl={3}>
                  <Button type="submit" raised color="primary">
                    Login <Send className={classes.iconStyle}/>
                  </Button>
                </Grid>

              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={1} sm={2} md={3} xl={4} />
        </Grid>

        </form>
      </div>
    );
  }
}

LoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm);
LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default withStyles(styles)(LoginForm);