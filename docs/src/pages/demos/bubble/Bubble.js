import React from 'react';
import Bubble from '@6thquake/react-material/Bubble';
import Button from '@6thquake/react-material/Button';
import FormControl from '@6thquake/react-material/FormControl';
import FormLabel from '@6thquake/react-material/FormLabel';
import FormControlLabel from '@6thquake/react-material/FormControlLabel';
import Radio from '@6thquake/react-material/Radio';
import RadioGroup from '@6thquake/react-material/RadioGroup';
import Grid from '@6thquake/react-material/Grid';
import { withStyles } from '@6thquake/react-material/styles';

/*
 * Left & Right sided rectangle styles that can be customized.
 * *
*/
const styles = {
  customization: {
    fontSize: 15,
    fontFamily: 'calgary',
    borderRadius: 5,
    width: 300,
    height: 'auto',
  },
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'none',
      arrowOriginalDirection: 'left',
      floatOriginal: 'false',
      parent: 'parent',
      ancestor: 'ancestor',
      self: 'self',
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (this.state.display == 'block') {
      this.setState({ display: 'none' });
    } else {
      this.setState({ display: 'block' });
    }
  }

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
      display: 'hidden',
    });

    if (this.state.display == 'block') {
      this.setState({ display: 'none' });
    }
  };

  componentDidMount() {
    this.setState({
      ancestor: document.getElementsByName('ancestor'),
      parent: document.getElementById('parent').getBoundingClientRect(),
      self: document.getElementById('self'),
    });
  }

  render() {
    const { classes } = this.props;

    /*props.parent  props.self are NOT necessarily required, but are REQUIRED when you want bubbles to be FLOATED.*/
    /*props.triSize  props.bgColor are NOT necessarily required, and default settings will be used when not provided.*/
    return (
      <div>
        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Arrow Direction</FormLabel>
              <RadioGroup
                aria-label="arrowDirection"
                name="arrowDirection"
                value={this.state.arrowOriginalDirection}
                onChange={this.handleChange('arrowOriginalDirection')}
              >
                <FormControlLabel value="left" control={<Radio />} label="Left" />
                <FormControlLabel value="right" control={<Radio />} label="Right" />
                <FormControlLabel value="top" control={<Radio />} label="Top" />
                <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Floated?</FormLabel>
              <RadioGroup
                id="floated"
                aria-label="floated"
                name="floated"
                value={this.state.floatOriginal}
                onChange={this.handleChange('floatOriginal')}
              >
                <FormControlLabel value="true" control={<Radio />} label="Float" />
                <FormControlLabel value="false" control={<Radio />} label="Non-float" />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>

        <div name="ancestor">
          <div id="parent" style={{ position: 'relative', display: 'inline-block' }}>
            <Button variant="raised" onClick={this.handleClick}>
              Click Me
            </Button>
          </div>
          <div style={{ display: this.state.display }}>
            <div id="self">
              <Bubble
                parent={this.state.parent}
                self={this.state.self}
                ancestor={this.state.ancestor}
                direction={this.state.arrowOriginalDirection}
                floated={this.state.floatOriginal}
                triSize="12"
                bgColor="cyan"
                classes={{ customization: classes.customization }}
              >
                <p>Hello, this is simply a test bubble dialog conversation.</p>
                <p>TEST.</p>
              </Bubble>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(App);

/*<div id="nonFloated" style={{ display: 'none' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div id="nonFloatParent">
              <Button variant="raised" onClick={this.handleClick}>
                Click Me
              </Button>
            </div>
            <div style={{ display: this.state.display }}>
              <Bubble
                parent="nonFloatParent"
                direction={this.state.arrowOriginalDirection}
                floated={false}
                content="Hello, this is simply a test bubble dialog conversation."
                triSize="12"
                bgColor="cyan"
                classes={{ customization: classes.customization }}
              />
            </div>
          </div>
        </div>

        <div id="floated" style={{ display: 'none' }}>
          <div>
            <div id="floatParent" style={{ position: 'relative' }}>
              <Button variant="raised" onClick={this.handleClick}>
                Click Me
              </Button>
            </div>
            <div style={{ display: this.state.display, position: 'relative', left: '50%' }}>
              <Bubble
                parent="parent"
                direction="left"
                floated={true}
                content="Hello, this is simply a test bubble dialog conversation."
                triSize="12"
                bgColor="cyan"
                classes={{ customization: classes.customization }}
              />
            </div>
          </div>
        </div>*/
