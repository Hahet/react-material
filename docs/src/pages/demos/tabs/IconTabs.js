import React from 'react';
import Paper from '@6thquake/react-material/Paper';
import Tabs from '@6thquake/react-material/Tabs';
import Tab from '@6thquake/react-material/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';

export default class IconTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    return (
      <Paper style={{ width: 500 }}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab icon={<PhoneIcon />} />
          <Tab icon={<FavoriteIcon />} />
          <Tab icon={<PersonPinIcon />} />
        </Tabs>
      </Paper>
    );
  }
}
