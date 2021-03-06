import React, { Component } from 'react';
import { withStyles } from '@6thquake/react-material/styles';
import PropTypes from 'prop-types';
import ListItem from '@6thquake/react-material/ListItem';
import List from '@6thquake/react-material/List';
import ListItemText from '@6thquake/react-material/ListItemText';
import { DropTarget } from '@6thquake/react-material/DragBase';
import { OrderDropTarget } from '@6thquake/react-material/OrderDrag';
const styles = theme => ({
  root: {
    position: 'relative',
    width: '600px',
    height: '400px',
  },
  list: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    top: '50px',
    width: '200px',
  },
});
class DragList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ['first', 'second', 'third', 'forth'],
    };
  }
  sequence = (from, to) => {
    //重排数据
    let valueLength = this.state.value.length;
    let _cc = this.state.value;
    if (from < valueLength && to < valueLength) {
      let tempValue = _cc.splice(from, 1);
      _cc.splice(to, 0, tempValue[0]);
    }
    this.setState({
      value: _cc,
    });
  };
  remove = index => {
    let _cc = this.state.value;
    if (index < this.state.value.length) {
      _cc.splice(index, 1);
    }
    this.setState({
      value: _cc,
    });
  };
  add = value => {
    let _cc = this.state.value;
    _cc.push(value);
    if (value) {
      this.setState({
        value: _cc,
      });
    }
  };
  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const _childComponents = (value || []).map((item, index) => {
      if (item) {
        return (
          <ListItem component="div" cols={1} rows={1}>
            <ListItemText primary={`item-${item}`} />
          </ListItem>
        );
      }
    });
    // console.log(_childComponents);
    return (
      <div className={classes.root}>
        <List component="nav" className={classes.list}>
          <DropTarget>
            <OrderDropTarget
              colsCount={1}
              cellSize={80}
              defaultComponents={_childComponents}
              sequence={this.sequence}
              remove={this.remove}
              add={this.add}
            />
          </DropTarget>
        </List>
      </div>
    );
  }
}

export default withStyles(styles)(DragList);
