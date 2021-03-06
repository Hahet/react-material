import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import CircularProgress from '@6thquake/react-material/CircularProgress';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

function CircularStatic(props) {
  const { classes } = props;
  return (
    <div>
      <CircularProgress className={classes.progress} variant="static" value={5} />
      <CircularProgress className={classes.progress} variant="static" value={25} />
      <CircularProgress className={classes.progress} variant="static" value={50} />
      <CircularProgress className={classes.progress} variant="static" value={75} />
      <CircularProgress className={classes.progress} variant="static" value={100} />
    </div>
  );
}

CircularStatic.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularStatic);
