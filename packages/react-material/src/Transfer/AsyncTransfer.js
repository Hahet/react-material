import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '../styles';
import List from '../List';
import ListItem from '../ListItem';
import ListItemSecondaryAction from '../ListItemSecondaryAction';
import ListItemText from '../ListItemText';
import Checkbox from '../Checkbox';
import Button from '../Button';
import IconButton from '../IconButton';
import SelectFilter from './SelectFilter'
import { ChevronRight, ChevronLeft, LastPage, FirstPage } from '@material-ui/icons';
import { Select } from '@material-ui/core';
import Pagination from '../Pagination/Pagination'
import Divider from '../Divider';
const styles = {
  root: {
    minWidth: '700px',
    height: '100%',
    minHeight: '300px',
    width: '100%',
    position: 'relative'
  },
  lists: {
    height: '100%',
    maxHeight: '400px',
    overflow: 'scroll',
    display: 'inline-block',
    border: '1px solid rgba(0,0,0,0.1)',
    width: '45%',
    minWidth: '300px',
    maxWidth: '300px',
    position: 'absolute'
  },
  leftLists: {

  },
  rightLists: {
    right: '0',
    top: '0'
  },
  btngrp: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    top: '50%',
    transform: 'translateY(-50%)'

  },
  devideleft: {
    position: 'absolute',
    top: '250px',
    left: '0',
    width: '100%'
  },
  devideright: {
    position: 'absolute',
    top: '250px',
    right: '0',
    width: '100%'
  },
  paginationleft: {
    position: 'absolute',
    top: '250px ',
    left: '0',
    width: '100%'
  },
  paginationright: {
    position: 'absolute',
    top: '250px',
    right: '0',
    width: '100%'
  }

};
//过滤文本的防抖函数
const throttling = (fn, wait, maxTimeLong) => {
  wait = wait || 100;
  maxTimeLong = maxTimeLong || 300;
  let timeout = null;
  let start = new Date();
  return function (e) {
    if (timeout) { clearTimeout(timeout) };
    let now = new Date();
    if (now - start >= maxTimeLong) {
      fn(e);
      start = now;
    } else {
      timeout = setTimeout((e) => fn(e), wait);
    }
  }

}
class AsyncTransfer extends React.Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      leftChecked: [],   //左边选中的item
      rightChecked: [],
      pageConfigLeft: props.pageConfigL,  //左边的分页参数
      pageConfigRight: props.pageConfigR
    };
  }
  static defaultProps = {
    placeholder: 'please input something',
    onChange: function () {
      console.log("need cb function")
    },
    filterOption: false,
    paginationOption: false
  }
  static propTypes = {
    filterOption: PropTypes.boolean,
    placeholder: PropTypes.string,
    left: PropTypes.array.isRequired,
    right: PropTypes.array.isRequired,
    paginationOption: PropTypes.boolean,
    onChange: PropTypes.func
  }
  //数组去重
  subSet = (arr1, arr2) => {
    var set1 = new Set(arr1);
    var set2 = new Set(arr2);

    var subset = [];

    for (let item of set1) {
      if (!set2.has(item)) {
        subset.push(item);
      }
    }

    return subset;
  };

  transferToggle = position => () => {     //左右移动选中部分
    const { leftChecked, rightChecked } = this.state;
    let _checked = position == 'left' ? leftChecked : position == 'right' ? rightChecked : '';
    let _otherPos = position == 'left' ? 'right' : 'left';
    let aaa = this.subSet(this.props[position], _checked);
    let newData = {};
    newData[position] = aaa;
    newData[_otherPos] = [].concat(this.props[_otherPos], _checked);
    this.setState({
      leftChecked: [],
      rightChecked: [],
      pageConfigLeft: {
        ...this.props.pageConfigL,
        total: newData.left.length
      },
      pageConfigRight: {
        ...this.props.pageConfigR,
        total: newData.right.length
      }
    });
     this.props.onChange(newData);
  };

  transferAllToggle = position => () => {    //左右移动所有
    const { left, right } = this.props;
    let _checked = position == 'left' ? left : position == 'right' ? right : '';
    let _otherPos = position == 'left' ? 'right' : 'left';
    let aaa = this.subSet(this.props[position], _checked);
    let newData = {};
    newData[position] = aaa;
    newData[_otherPos] = [].concat(this.props[_otherPos], _checked);
    this.setState({
      leftChecked: [],
      rightChecked: [],
      pageConfigLeft: {
        ...this.props.pageConfigL,
        total: newData.left.length
      },
      pageConfigRight: {
        ...this.props.pageConfigR,
        total: newData.right.length
      }
    });
    this.props.onChange(newData);
  };

  handleToggle = (value, position) => () => {
    const { leftChecked, rightChecked } = this.state;
    let _checked = position == 'left' ? leftChecked : position == 'right' ? rightChecked : '';

    const currentIndex = _checked.indexOf(value);
    const newChecked = [..._checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    if (position == 'left') {
      this.setState({
        leftChecked: newChecked,
      });
    }
    if (position == 'right') {
      this.setState({
        rightChecked: newChecked,
      });
    }
  };

  //过滤文本改変的函数
  textchange = position => (e) => {
   this.props.filterChangeCb(position,e.target.value);
  }
  pageCallbackFnLeft(currentPage1) {  //左边的分页参数改变回调
    this.setState({
      pageConfigLeft: {
        ...this.state.pageConfigLeft,
        currentPage: currentPage1
      }
    });
  }
  pageCallbackFnRight(currentPage1) {
    this.setState({
      pageConfigRight: {
        ...this.state.pageConfigRight,
        currentPage: currentPage1
      }
    });
  }
  listItem(options, pageConfig) {  //只渲染属于该页面的item
    console.log(pageConfig);
  
    if (Array.isArray(options)) {
      let start = (pageConfig.currentPage - 1) * pageConfig.pageSize;
      let end = pageConfig.currentPage * pageConfig.pageSize > options.length ? undefined : pageConfig.currentPage * pageConfig.pageSize;
      return options.slice(start, end)
    } else {
      throw new Error(
        'React-Material: the `options` property must be an array '
      );
    }
  }
  static getDerivedStateFromProps(newprops, prestate){
    if(newprops.pageConfigL!==prestate.pageConfigLeft){
      return newprops.pageConfigL;
    }else if(newprops.pageConfigR!==prestate.pageConfigRight){
      return newprops.pageConfigR;
    }else{
      return null;
    }
  }
  render() {
    const { classes, filterOption, placeholder, paginationOption } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.btngrp}>
          <Button color="primary" onClick={this.transferAllToggle('left')}>
            <LastPage />
          </Button><br />
          <Button color="primary" onClick={this.transferToggle('left')}>
            <ChevronRight />
          </Button><br />
          <Button color="primary" onClick={this.transferToggle('right')}>
            <ChevronLeft />
          </Button><br />
          <Button color="primary" onClick={this.transferAllToggle('right')}>
            <FirstPage />
          </Button>
        </div>

        <div className={classes.lists + ' ' + classes.leftLists}>
          <List>
            {filterOption && <SelectFilter
              fullWidth={true}
              autoFocus={true}
              placeholder={placeholder}
              onChange={throttling(this.textchange('left')).bind(this)}
            ></SelectFilter>}
            {this.listItem(this.props.left, this.state.pageConfigLeft).map(value => (
              <ListItem
                key={value.id}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value, 'left')}
              >
                <Checkbox
                  checked={this.state.leftChecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`${value.name}`} />
              </ListItem>
            ))}
            <Divider className={classes.devideleft} />
            {paginationOption && <Pagination
              classes={{ paginationDiv: classes.paginationleft }}
              {...this.state.pageConfigLeft}
              pageCallbackFn={this.pageCallbackFnLeft.bind(this)}
            >
            </Pagination>}
          </List>
        </div>

        <div className={classes.lists + ' ' + classes.rightLists}>
          <List>
            {filterOption && <SelectFilter
              fullWidth={true}
              autoFocus={true}
              placeholder={placeholder}
              onChange={throttling(this.textchange('right')).bind(this)}
            ></SelectFilter>}
            {this.listItem(this.props.right, this.state.pageConfigRight).map(value => (
              <ListItem
                key={value.id}
                role={undefined}
                dense
                button
                onClick={this.handleToggle(value, 'right')}
              >
                <Checkbox
                  checked={this.state.rightChecked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                />
                <ListItemText primary={`${value.name}`} />

              </ListItem>
            ))}
            <Divider className={classes.devideright} />
            {paginationOption && <Pagination
              classes={{ paginationDiv: classes.paginationright }}
              {...this.state.pageConfigRight}
              pageCallbackFn={this.pageCallbackFnRight.bind(this)}
            >
            </Pagination>}
          </List>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AsyncTransfer);