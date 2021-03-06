import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@6thquake/react-material/styles';
import Grid, { CompatibleGrid } from '@6thquake/react-material/Grid';
import FormControl from '@6thquake/react-material/FormControl';
import FormLabel from '@6thquake/react-material/FormLabel';
import FormControlLabel from '@6thquake/react-material/FormControlLabel';
import Radio from '@6thquake/react-material/Radio';
import RadioGroup from '@6thquake/react-material/RadioGroup';
import Paper from '@6thquake/react-material/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 340,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    height: '100%',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});

class InteractiveGrid extends React.Component {
  state = {
    direction: 'row',
    justify: 'center',
    alignItems: 'center',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { alignItems, direction, justify } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            {[0, 1, 2].map(value => (
              <Grid key={value} item>
                <Paper
                  className={classes.paper}
                  style={{ paddingTop: (value + 1) * 5, paddingBottom: (value + 1) * 5 }}
                >
                  {`Cell ${value + 1}`}
                </Paper>
              </Grid>
            ))}

            <Grid key={3} item xs>
              <Paper className={classes.paper}>{'Cell 4'}</Paper>
            </Grid>
          </Grid>
        </Grid>

        <CompatibleGrid item xs={12}>
          <CompatibleGrid
            container
            spacing={16}
            className={classes.demo}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            {[0].map(value => (
              <CompatibleGrid key={value} item>
                <Paper
                  className={classes.paper}
                  style={{ paddingTop: (value + 1) * 5, paddingBottom: (value + 1) * 5 }}
                >
                  {`Cell ${value + 1}`}
                </Paper>
              </CompatibleGrid>
            ))}

            <CompatibleGrid key={3} item xs>
              <Paper className={classes.paper}>{'Cell 4'}</Paper>
            </CompatibleGrid>
          </CompatibleGrid>
        </CompatibleGrid>

        <Grid item xs={12}>
          <Paper className={classes.control}>
            <Grid container>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>direction</FormLabel>
                  <RadioGroup
                    name="direction"
                    aria-label="direction"
                    value={direction}
                    onChange={this.handleChange('direction')}
                  >
                    <FormControlLabel value="row" control={<Radio />} label="row" />
                    <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
                    <FormControlLabel value="column" control={<Radio />} label="column" />
                    <FormControlLabel
                      value="column-reverse"
                      control={<Radio />}
                      label="column-reverse"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>justify</FormLabel>
                  <RadioGroup
                    name="justify"
                    aria-label="justify"
                    value={justify}
                    onChange={this.handleChange('justify')}
                  >
                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                    <FormControlLabel value="center" control={<Radio />} label="center" />
                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                    <FormControlLabel
                      value="space-between"
                      control={<Radio />}
                      label="space-between"
                    />
                    <FormControlLabel
                      value="space-around"
                      control={<Radio />}
                      label="space-around"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl component="fieldset">
                  <FormLabel>alignItems</FormLabel>
                  <RadioGroup
                    name="alignItems"
                    aria-label="alignItems"
                    value={alignItems}
                    onChange={this.handleChange('alignItems')}
                  >
                    <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                    <FormControlLabel value="center" control={<Radio />} label="center" />
                    <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                    <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                    <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

InteractiveGrid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InteractiveGrid);
