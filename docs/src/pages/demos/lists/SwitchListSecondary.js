import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import List from '@6thquake/react-material/List';
import ListItem from '@6thquake/react-material/ListItem';
import ListItemIcon from '@6thquake/react-material/ListItemIcon';
import ListItemSecondaryAction from '@6thquake/react-material/ListItemSecondaryAction';
import ListItemText from '@6thquake/react-material/ListItemText';
import ListSubheader from '@6thquake/react-material/ListSubheader';
import Switch from '@6thquake/react-material/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import BluetoothIcon from '@material-ui/icons/Bluetooth';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

class SwitchListSecondary extends React.Component {
  state = {
    checked: ['wifi'],
  };

  handleToggle = value => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <ListItemIcon>
              <WifiIcon />
            </ListItemIcon>
            <ListItemText primary="Wi-Fi" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('wifi')}
                checked={this.state.checked.indexOf('wifi') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <BluetoothIcon />
            </ListItemIcon>
            <ListItemText primary="Bluetooth" />
            <ListItemSecondaryAction>
              <Switch
                onChange={this.handleToggle('bluetooth')}
                checked={this.state.checked.indexOf('bluetooth') !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
    );
  }
}

SwitchListSecondary.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwitchListSecondary);
