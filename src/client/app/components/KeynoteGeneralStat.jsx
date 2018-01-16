import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import { AccessTime, Group, RemoveRedEye } from 'material-ui-icons';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const getAttendees = (data) => {
  if (data === undefined || data.length === 0) {
    return null;
  }
  else {
    return data[data.length - 1].attendees;
  }
};

const getAttentiveness = (data) => {
  if (data === undefined || data.length === 0) {
    return null;
  }
  else {
    return data[data.length - 1].attention;
  }
};

const mapStateToProps = state => {
  return {
    attendees: getAttendees(state.keynoteStats.attendanceData),
    focus: getAttentiveness(state.keynoteStats.attentivenessData),
  };
};

const propTypes = {
  classes: PropTypes.object.isRequired,
  time: PropTypes.string.isRequired,
};

class KeynoteGeneralStat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { time, attendees, focus } = this.props;
    return (
        <List className={classes.root}>
          <ListItem button>
            <ListItemIcon><AccessTime /></ListItemIcon>
            <ListItemText primary={time}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><Group /></ListItemIcon>
            <ListItemText primary={attendees}/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><RemoveRedEye /></ListItemIcon>
            <ListItemText primary={focus} />
          </ListItem>
        </List>
    )
  }
}

KeynoteGeneralStat = connect(mapStateToProps, null)(KeynoteGeneralStat);
KeynoteGeneralStat.propTypes = propTypes;

export default withStyles(styles)(KeynoteGeneralStat);