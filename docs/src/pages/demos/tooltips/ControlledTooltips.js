import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@6thquake/react-material/IconButton';
import Tooltip from '@6thquake/react-material/Tooltip';

class ControlledTooltips extends React.Component {
  state = {
    open: false,
  };

  handleTooltipClose = () => {
    this.setState({ open: false });
  };

  handleTooltipOpen = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <Tooltip
        enterDelay={300}
        id="tooltip-controlled"
        leaveDelay={300}
        onClose={this.handleTooltipClose}
        onOpen={this.handleTooltipOpen}
        open={this.state.open}
        placement="bottom"
        title="Delete"
      >
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    );
  }
}

export default ControlledTooltips;
