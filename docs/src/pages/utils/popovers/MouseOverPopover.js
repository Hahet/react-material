/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import React from 'react';
import PropTypes from 'prop-types';
import Popover from '@6thquake/react-material/Popover';
import Typography from '@6thquake/react-material/Typography';
import { withStyles } from '@6thquake/react-material/styles';
import Grow from '@6thquake/react-material/Grow';
import Paper from '@6thquake/react-material/Paper';
import { Manager, Reference, Popper } from 'react-popper';

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit,
  },
  popover: {
    pointerEvents: 'none',
  },
  popperClose: {
    pointerEvents: 'none',
  },
});

class MouseOverPopover extends React.Component {
  state = {
    anchorEl: null,
    popperOpen: false,
  };

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.target });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  handlePopperOpen = () => {
    this.setState({ popperOpen: true });
  };

  handlePopperClose = () => {
    this.setState({ popperOpen: false });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, popperOpen } = this.state;
    const open = !!anchorEl;

    return (
      <div className="wrapper">
        <Typography onMouseOver={this.handlePopoverOpen} onMouseOut={this.handlePopoverClose}>
          Hover with a Popover.
        </Typography>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <Typography>I use Popover.</Typography>
        </Popover>
        <Manager>
          <Reference>
            <Typography
              aria-describedby="react-popper-tooltip"
              onMouseOver={this.handlePopperOpen}
              onMouseOut={this.handlePopperClose}
            >
              Hover with react-popper.
            </Typography>
          </Reference>
          <Popper
            placement="bottom-start"
            eventsEnabled={popperOpen}
            className={!popperOpen ? classes.popperClose : ''}
          >
            <Grow in={popperOpen} style={{ transformOrigin: '0 0 0' }}>
              <Paper
                id="react-popper-tooltip"
                className={classes.paper}
                role="tooltip"
                aria-hidden={!popperOpen}
                elevation={8}
              >
                <Typography>I use react-popper.</Typography>
              </Paper>
            </Grow>
          </Popper>
        </Manager>
      </div>
    );
  }
}

MouseOverPopover.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MouseOverPopover);
