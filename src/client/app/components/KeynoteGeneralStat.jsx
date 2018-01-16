import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import { AccessTime, Group, RemoveRedEye } from 'material-ui-icons';

const styles = theme => ({
  root: {
    width: '100%',
  },
});

const propTypes = {
  classes: PropTypes.object.isRequired,
};

class KeynoteGeneralStat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
        <List className={classes.root}>
          <ListItem button>
            <ListItemIcon><AccessTime /></ListItemIcon>
            <ListItemText primary="23:30:20"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><Group /></ListItemIcon>
            <ListItemText primary="16 Attendees"/>
          </ListItem>
          <ListItem button>
            <ListItemIcon><RemoveRedEye /></ListItemIcon>
            <ListItemText primary="56 % Focus"/>
          </ListItem>
        </List>
    )
  }
}

KeynoteGeneralStat.propTypes = propTypes;

export default withStyles(styles)(KeynoteGeneralStat);