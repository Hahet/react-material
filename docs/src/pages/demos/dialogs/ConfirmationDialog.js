/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import Button from '@6thquake/react-material/Button';
import List from '@6thquake/react-material/List';
import ListItem from '@6thquake/react-material/ListItem';
import ListItemText from '@6thquake/react-material/ListItemText';
import Dialog from '@6thquake/react-material/Dialog';
import DialogActions from '@6thquake/react-material/DialogActions';
import DialogContent from '@6thquake/react-material/DialogContent';
import DialogContentText from '@6thquake/react-material/DialogContentText';
import DialogTitle from '@6thquake/react-material/DialogTitle';
import Radio from '@6thquake/react-material/Radio';
import RadioGroup from '@6thquake/react-material/RadioGroup';
import FormControlLabel from '@6thquake/react-material/FormControlLabel';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

class ConfirmationDialog extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state.value = this.props.value;
  }

  state = {};

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  radioGroup = null;

  handleEntering = () => {
    this.radioGroup.focus();
  };

  handleCancel = () => {
    this.props.onClose(this.props.value);
  };

  handleOk = () => {
    this.props.onClose(this.state.value);
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value, ...other } = this.props;

    return (
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={this.handleEntering}
        aria-labelledby="confirmation-dialog-title"
        {...other}
      >
        <DialogTitle id="confirmation-dialog-title">Phone Ringtone</DialogTitle>
        <DialogContent>
          <RadioGroup
            ref={node => {
              this.radioGroup = node;
            }}
            aria-label="ringtone"
            name="ringtone"
            value={this.state.value}
            onChange={this.handleChange}
          >
            {options.map(option => (
              <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func,
  value: PropTypes.string,
};

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  dialog: {
    width: '80%',
    maxHeight: 435,
  },
});

class ConfirmationDialogDemo extends React.Component {
  state = {
    open: false,
    value: 'Dione',
  };

  button = undefined;

  handleClickListItem = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    this.setState({ value, open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List>
          <ListItem button divider disabled>
            <ListItemText primary="Interruptions" />
          </ListItem>
          <ListItem
            button
            divider
            aria-haspopup="true"
            aria-controls="ringtone-menu"
            aria-label="Phone ringtone"
            onClick={this.handleClickListItem}
          >
            <ListItemText primary="Phone ringtone" secondary={this.state.value} />
          </ListItem>
          <ListItem button divider disabled>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
          <ConfirmationDialog
            classes={{
              paper: classes.dialog,
            }}
            open={this.state.open}
            onClose={this.handleClose}
            value={this.state.value}
          />
        </List>
      </div>
    );
  }
}

ConfirmationDialogDemo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmationDialogDemo);
