import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'react-material/styles';
import Input from 'react-material/Input';
import InputLabel from 'react-material/InputLabel';
import InputAdornment from 'react-material/InputAdornment';
import FormControl from 'react-material/FormControl';
import TextField from 'react-material/TextField';
import Grid from 'react-material/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
  },
});

function InputWithIcon(props) {
  const { classes } = props;

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">With a start adornment</InputLabel>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      <TextField
        className={classes.margin}
        id="input-with-icon-textfield"
        label="TextField"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <div className={classes.margin}>
        <Grid container spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountCircle />
          </Grid>
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

InputWithIcon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputWithIcon);
