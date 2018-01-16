import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { changeMenuTitle } from '../actions/index';

const styles = {
  root: {
    flexGrow: 1,
  },
  center: {
    display: "flex",
    justifyContent: "center",
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      changeMenuTitle: title => dispatch(changeMenuTitle(title))
    }
  };
};

const propTypes = {
  actions: PropTypes.shape({
    changeMenuTitle: PropTypes.func.isRequired
  })
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Home - Realtime keynote analysis",
    }
  }

  componentDidMount() {
    const title = this.state.title;
    document.title = title;
    this.props.actions.changeMenuTitle(title);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="component-home">
        <br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <Grid container className={classes.root}>

          <Grid item xs={12}>
            <Grid container className={classes.center}>
              <Typography type="headline" component="h2">
                Welcome to realtime keynote analysis
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container className={classes.center}>
              <Link to="/recording-center">
                <Button raised color="primary">
                  Start new live keynote
                </Button>
              </Link>
            </Grid>
          </Grid>

        </Grid>
      </div>
    )
  }
}

Home = connect(null, mapDispatchToProps)(Home);
Home.propTypes = propTypes;

export default withStyles(styles)(Home);