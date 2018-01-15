import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Grid from 'material-ui/Grid';
import { changeMenuTitle } from '../actions/index';

const mapDispatchToProps = dispatch => {
  return {
    actions: {
      changeMenuTitle: title => dispatch(changeMenuTitle(title))
    }
  };
};

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
        <Grid container className="home-grid">
          <Grid item xs={1} sm={1} md={1} xl={2} />

          <Grid item xs={10} sm={10} md={10} xl={8}>
            <Grid container>
              <h1>Welcome to realtime keynote analysis</h1>
              <Link to="/recording-center">Start new live keynote</Link>
            </Grid>
          </Grid>

          <Grid item xs={1} sm={1} md={1} xl={2} />
        </Grid>
      </div>
    )
  }
}

Home = connect(null, mapDispatchToProps)(Home);

export default Home;