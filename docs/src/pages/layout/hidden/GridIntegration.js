import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@6thquake/react-material/styles';
import Paper from '@6thquake/react-material/Paper';
import Grid from '@6thquake/react-material/Grid';
import withWidth from '@6thquake/react-material/withWidth';
import Typography from '@6thquake/react-material/Typography';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

function GridIntegration(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="subheading" gutterBottom>
        Current width: {props.width}
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs hidden={{ xsUp: true }}>
          <Paper className={classes.paper}>xsUp</Paper>
        </Grid>
        <Grid item xs hidden={{ smUp: true }}>
          <Paper className={classes.paper}>smUp</Paper>
        </Grid>
        <Grid item xs hidden={{ mdUp: true }}>
          <Paper className={classes.paper}>mdUp</Paper>
        </Grid>
        <Grid item xs hidden={{ lgUp: true }}>
          <Paper className={classes.paper}>lgUp</Paper>
        </Grid>
        <Grid item xs hidden={{ xlUp: true }}>
          <Paper className={classes.paper}>xlUp</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

GridIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
  width: PropTypes.string,
};

export default compose(
  withStyles(styles),
  withWidth(),
)(GridIntegration);
