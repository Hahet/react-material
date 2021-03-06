import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import SelectRoot from './SyncSelect';
import Pagination from '../Pagination/Pagination';
import AsyncSelectFilter from './AsyncSelectFilter';
import Divider from '../Divider';
import { withStyles } from '../styles';
import ArrowDropDownIcon from '../internal/svg-icons/ArrowDropDown';
import Input from '../Input';

const styles = theme => ({
  selectMenu: {
    whiteSpace: 'pre-wrap',
  },
  root: {
    width: '100%',
  },
});

class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginationProps: {
        page: 0,
        rowsPerPage: 5,
        count: 0,
      },
      text: '',
      optionsArray: [],
    };
  }
  onChangePage(i) {
    this.setState(
      {
        paginationProps: {
          ...this.state.paginationProps,
          page: i,
        },
      },
      () => {
        let op = this.menuItems(this.state.text);
        let start = this.state.paginationProps.page * this.state.paginationProps.rowsPerPage;
        let end =
          (this.state.paginationProps.page + 1) * this.state.paginationProps.rowsPerPage > op.length
            ? undefined
            : (this.state.paginationProps.page + 1) * this.state.paginationProps.rowsPerPage;
        this.setState({
          optionsArray: op.slice(start, end),
        });
      },
    );
  }
  onfilter(e) {
    const op = this.menuItems(e.target.value);
    this.setState(
      {
        text: e.target.value,
        paginationProps: {
          ...this.state.paginationProps,
          page: 0,
          count: op.length,
        },
      },
      () => {
        let op = this.menuItems(this.state.text);
        let start = this.state.paginationProps.page * this.state.paginationProps.rowsPerPage;
        let end =
          (this.state.paginationProps.page + 1) * this.state.paginationProps.rowsPerPage > op.length
            ? undefined
            : (this.state.paginationProps.page + 1) * this.state.paginationProps.rowsPerPage;
        this.setState({
          optionsArray: op.slice(start, end),
        });
      },
    );
  }
  menuItems(text) {
    const { children } = this.props;
    let filterData = [];
    if (children) {
      filterData = React.Children.toArray(children).filter(child => {
        return (
          !text ||
          child.props.children.toLowerCase().indexOf(text.toLowerCase()) !== -1 ||
          child.props.value.toLowerCase().indexOf(text.toLowerCase()) !== -1
        );
      });
      return filterData;
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps !== prevState.preProps) {
      if (nextProps.showPagination) {
        return {
          paginationProps: {
            ...prevState.paginationProps,
            rowsPerPage: nextProps.rowsPerPage,
            count: nextProps.children.length,
          },
          preProps: nextProps,
        };
      } else {
        return {
          optionsArray: nextProps.children,
          preProps: nextProps,
        };
      }
    }
    return null;
  }
  render() {
    const {
      children,
      placeholder,
      multiple,
      classes,
      disabled,
      htmlFor,
      onChange,
      renderValue,
      value,
      showPagination,
      showFilter,
      displayEmpty,
      IconComponent,
      ...other
    } = this.props;
    const { text, paginationProps, optionsArray } = this.state;
    return (
      <SelectRoot
        {...other}
        multiple={multiple}
        value={value}
        displayEmpty={displayEmpty}
        onChange={onChange}
        classes={{
          ...classes,
          root: classes.root,
          selectMenu: classes.selectMenu,
        }}
        inputProps={{
          IconComponent: IconComponent,
          placeholder: placeholder,
          id: htmlFor,
        }}
        disabled={disabled}
        renderValue={selected => {
          if (renderValue) {
            return renderValue(selected);
          } else {
            let displaySingle = '';
            const displayMultiple = [];
            React.Children.map(children, child => {
              if (!React.isValidElement(child)) {
                return null;
              }
              let selected;

              if (multiple) {
                if (!Array.isArray(value)) {
                  throw new Error(
                    'Material-UI: the `value` property must be an array ' +
                      'when using the `Select` component with `multiple`.',
                  );
                }

                selected = value.indexOf(child.props.value) !== -1;
                if (selected) {
                  displayMultiple.push(child.props.children);
                }
              } else {
                selected = value === child.props.value;
                if (selected) {
                  displaySingle = child.props.children;
                }
              }
            });
            return multiple ? displayMultiple.join(', ') : displaySingle;
          }
        }}
      >
        {showFilter ? (
          <AsyncSelectFilter
            fullWidth={true}
            autoFocus={true}
            text={text}
            placeholder={placeholder}
            onChange={this.onfilter.bind(this)}
          />
        ) : null}
        {optionsArray}
        {showPagination ? <Divider /> : null}
        {showPagination ? (
          <Pagination {...paginationProps} onChangePage={this.onChangePage.bind(this)} />
        ) : null}
      </SelectRoot>
    );
  }
}

Select.propTypes = {
  /**
   * If true, the width of the popover will automatically be set according to the items inside the
   * menu, otherwise it will be at least the width of the select input.
   */
  autoWidth: PropTypes.bool,
  /**
   * The option elements to populate the select with.
   * Can be some `MenuItem` when `native` is false and `option` when `native` is true.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the selected item is displayed even if its value is empty.
   * You can only use it when the `native` property is `false` (default).
   */
  displayEmpty: PropTypes.bool,
  /**
   * The icon that displays the arrow.
   */
  IconComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.object]),
  /**
   * An `Input` element; does not have to be a material-ui specific `Input`.
   */
  input: PropTypes.element,
  /**
   * Attributes applied to the `input` element.
   * When `native` is `true`, the attributes are applied on the `select` element.
   */
  inputProps: PropTypes.object,
  /**
   * Properties applied to the [`Menu`](/api/menu) element.
   */
  MenuProps: PropTypes.object,
  /**
   * If true, `value` must be an array and the menu will support multiple selections.
   * You can only use it when the `native` property is `false` (default).
   */
  multiple: PropTypes.bool,
  /**
   * If `true`, the component will be using a native `select` element.
   */
  native: PropTypes.bool,
  /**
   * Callback function fired when a menu item is selected.
   *
   * @param {object} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value`.
   * @param {object} [child] The react element that was selected when `native` is `false` (default).
   */
  onChange: PropTypes.func,
  /**
   * Callback fired when the component requests to be closed.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onClose: PropTypes.func,
  /**
   * Callback fired when the component requests to be opened.
   * Use in controlled mode (see open).
   *
   * @param {object} event The event source of the callback
   */
  onOpen: PropTypes.func,
  /**
   * Control `select` open state.
   * You can only use it when the `native` property is `false` (default).
   */
  open: PropTypes.bool,
  /**
   * Render the selected value.
   * You can only use it when the `native` property is `false` (default).
   *
   * @param {*} value The `value` provided to the component.
   * @returns {ReactElement}
   */
  renderValue: PropTypes.func,
  /**
   * Properties applied to the clickable div element.
   */
  SelectDisplayProps: PropTypes.object,
  /**
   * The input value.
   * This property is required when the `native` property is `false` (default).
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ]),
  /**
   * page size
   */
  rowsPerPage: PropTypes.num,
  /**
   * placeholder
   */
  placeholder: PropTypes.string,

  /**
   * decided select is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If true ,show the filter box
   */
  showFilter: PropTypes.bool,
  /**
   * If true ,show the pagination box
   */
  showPagination: PropTypes.bool,
};

Select.defaultProps = {
  autoWidth: false,
  displayEmpty: false,
  rowsPerPage: 5,
  IconComponent: ArrowDropDownIcon,
  input: <Input />,
  multiple: false,
  native: false,
  placeholder: 'please input something',
  showFilter: false,
  showPagination: false,
};

export default withStyles(styles)(Select);
