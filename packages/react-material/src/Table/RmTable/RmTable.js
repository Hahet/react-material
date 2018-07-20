import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Head from './Head';
import Body from './Body';
import Toolbar from './TableToolbar';
import Pagination from './Pagination';
import filter from '../../utils/filter';

import { withStyles } from '../../styles';
import { darken, fade, lighten } from '../../styles/colorManipulator';

const styles = theme => ({
  root: {
    position: 'relative',
  },
  main: {
    overflowX: 'auto',
    width: '100%',
  },
  left: {
    position: 'absolute',
    left: 0,
    top: 0,
    background: '#fff',
  },
  leftShadow: {
    'box-shadow': '6px 0 6px -4px rgba(0,0,0,.2)',
  },
  right: {
    position: 'absolute',
    right: 0,
    top: 0,
    background: '#fff',
  },
  rightShadow: {
    'box-shadow': '-6px 0 6px -4px rgba(0,0,0,.2)',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    borderTop: `1px solid
    ${
      theme.palette.type === 'light'
        ? lighten(fade(theme.palette.divider, 1), 0.88)
        : darken(fade(theme.palette.divider, 1), 0.8)
    }`,
  },
});

class RmTable extends React.Component {
  constructor(props) {
    super(props);
    const columns = this.normalizeColumns(props.columns);
    this.state = {
      hasLeft: false,
      hasRight: true,
      columns: columns,
      search: '',
      page: props.paginationProps.page,
      rowsPerPage: props.paginationProps.rowsPerPage,
      data: props.data,
    };
  }
  searchedData = {
    data: this.props.data,
  };

  tableRefs = {
    root: React.createRef('root'),
    left: React.createRef('left'),
    main: React.createRef('main'),
    right: React.createRef('right'),
    head: React.createRef('head'),
    body: React.createRef('body'),
  };
  dragIndex = {
    targetIndex: '',
    sourceIndex: '',
  };
  propsCached = {};
  componentDidMount() {
    this.setTableShadow();
    this.syncTableRowHeight();
    this.handlePaginteData();
  }

  componentDidUpdate(nextProps, nextState) {
    const { data, paginatable, searchable } = this.props;

    if (data !== this.propsCached.data) {
      this.propsCached.data = data;
      this.filteredData();
    }

    if (searchable !== this.propsCached.searchable) {
      this.propsCached.searchable = searchable;
      this.filteredData();
    }

    if (paginatable !== this.propsCached.paginatable) {
      this.propsCached.paginatable = paginatable;
      this.filteredData();
    }
  }

  normalizeColumns = columns => {
    const leftColumns = columns.filter(item => item.fixed === 'left');
    const rightColumns = columns.filter(item => item.fixed === 'right');
    const unfixed = columns.filter(item => !item.fixed);
    return [...leftColumns, ...unfixed, ...rightColumns];
  };

  syncTableRowHeight = () => {
    let head = this.tableRefs.head.current;
    let headDom = ReactDOM.findDOMNode(head);
    let headHeight = headDom.getBoundingClientRect().height;
    let body = this.tableRefs.body.current;
    let bodyDom = ReactDOM.findDOMNode(body);
    let bodyHeight = bodyDom.getBoundingClientRect().height;
    this.setState({
      bodyRowHeight: bodyHeight / this.props.data.length,
      headRowHeight: headHeight,
    });
  };

  handleColDrag = config => {
    let { targetIndex, sourceIndex } = config;
    let { columns } = this.state;
    let sourceColumn = columns[sourceIndex];
    let targetColumn = columns[targetIndex];
    let fixed = targetColumn.fixed;
    sourceColumn.fixed = fixed;
    this.setState(
      update(this.state, {
        columns: {
          $splice: [[sourceIndex, 1], [targetIndex, 0, sourceColumn]],
        },
      }),
    );
  };

  handleResize = (index, colomn, size) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };

  onSearch = text => {
    this.setState(
      {
        search: text,
      },
      () => {
        this.filteredData();
      },
    );
  };
  dragSatrt = index => {
    this.dragIndex.sourceIndex = index;
  };

  dragEnd = index => {
    // todo ： 每次拖拽执行了两次， 多执行了一次。而且返回值不对
    // 这里先用类型过滤掉多余的一次
    if (typeof index === 'object') {
      return;
    }
    const { onColDrag } = this.props;
    this.dragIndex.targetIndex = index;
    onColDrag && onColDrag(this.dragIndex);
    this.handleColDrag(this.dragIndex);
  };
  filteredData = () => {
    const { data } = this.props;
    const { search } = this.state;
    let searchData = data;
    if (search) {
      searchData = filter(data, search);
    }
    this.searchedData.data = searchData;
    const result = this.handlePaginteData();
    return result;
  };
  handlePaginteData = () => {
    let data = this.searchedData.data;
    const { paginatable } = this.props;
    const { page, rowsPerPage } = this.state;

    if (paginatable) {
      data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    } else {
      return data;
    }
    this.setState({
      data,
    });
  };
  createCsv = () => {
    let head = this.state.columns.reduce((pre, cur) => {
      if (cur.render || !cur.title) {
        return pre;
      } else {
        return pre + ',' + cur.title;
      }
    }, '');
    let csv = head.slice(1) + '\r\n';
    let columns = this.state.columns;
    let data = this.searchedData.data;
    data.map(entry => {
      let row = '';
      columns.map(column => {
        row += (entry[column.dataIndex] || ' ') + ',';
      });
      csv += row + '\r\n';
    });
    return csv;
  };

  renderMainTable = () => {
    let { columns } = this.state;
    let result = this.renderTable(columns, 'main');
    return result;
  };

  renderLeftTable = () => {
    let columns = this.state.columns.filter(column => {
      return column.fixed === 'left';
    });
    return this.renderTable(columns, 'left');
  };
  renderRightTable = () => {
    let columns = this.state.columns.filter(column => {
      return column.fixed === 'right';
    });
    let baseLength = this.state.columns.length - columns.length;
    return this.renderTable(columns, 'right', baseLength);
  };
  renderTable = (columns, type, baseLength = 0) => {
    const { classes, height, resizable, dragable } = this.props;
    const { bodyRowHeight, headRowHeight, hasLeft, hasRight, data: bodyData } = this.state;
    let width =
      type === 'main'
        ? ''
        : columns.reduce((pre, cur) => {
            return pre + cur.width;
          }, 0);
    let style = {
      width,
    };
    const head = (
      <Head
        baseLength={baseLength}
        headRef={type === 'main' ? this.tableRefs.head : ''}
        columns={columns}
        onResize={this.handleResize}
        resizable={resizable}
        dragable={dragable}
        onDragStart={this.dragSatrt}
        onDragEnd={this.dragEnd}
        headRowHeight={headRowHeight}
        onColumnFixChange={this.handleColumnFixSwitch}
      />
    );
    const body = (
      <Body
        bodyRef={type === 'main' ? this.tableRefs.body : ''}
        data={bodyData}
        columns={columns}
        type={type}
        scroll={this.handlScrollY}
        height={height}
        tableRef={this.tableRefs[type]}
        bodyRowHeight={bodyRowHeight}
      />
    );
    const table = [head, body];
    const className = classNames(
      classes[type],
      { [classes.leftShadow]: type === 'left' && hasLeft },
      { [classes.rightShadow]: type === 'right' && hasRight },
    );
    const result = (
      <div style={style} ref={type === 'main' ? this.tableRefs.root : null} className={className}>
        {table}
      </div>
    );
    return result;
  };
  handleColumnFixSwitch = (index, fixed) => {
    let { columns } = this.state;
    columns[index].fixed = fixed;
    this.setState({
      columns: this.normalizeColumns(columns),
    });
  };
  handlScrollY = (e, t) => {
    let scrollTop = e.target.scrollTop;
    t !== 'left' && (this.tableRefs.left.current.scrollTop = scrollTop);
    t !== 'right' && (this.tableRefs.right.current.scrollTop = scrollTop);
    t !== 'main' && (this.tableRefs.main.current.scrollTop = scrollTop);
  };

  handleScrollX = e => {
    let scrollLeft = e.target.scrollLeft;
    if (e.target !== this.tableRefs.root.current) {
      return;
    }
    this.setTableShadow(scrollLeft);
  };
  handleChangePage = (event, page) => {
    this.setState(
      {
        page,
      },
      () => {
        this.handlePaginteData();
      },
    );
  };

  handleChangeRowsPerPage = event => {
    this.setState(
      {
        rowsPerPage: event.target.value,
      },
      () => {
        this.handlePaginteData();
      },
    );
  };

  setTableShadow = left => {
    let { scrollLeft, clientWidth } = this.tableRefs.root.current;
    scrollLeft = left || scrollLeft;
    let hasLeft = scrollLeft > 0;
    let hasRight = this.tableRefs.main.current.clientWidth - clientWidth - scrollLeft > 0;
    this.setState({
      hasLeft,
      hasRight,
    });
  };
  render() {
    const { classes, width, paginatable, searchable, exportProps, searchProps } = this.props;
    const { page, rowsPerPage } = this.state;
    return (
      <React.Fragment>
        <Toolbar
          onSearch={this.onSearch}
          headRef={this.tableRefs.head}
          bodyRef={this.tableRefs.body}
          createCsv={this.createCsv}
          searchable={searchable}
          exportProps={exportProps}
          searchProps={searchProps}
          width={width}
        />
        <div style={{ width }} className={classes.root} onScroll={this.handleScrollX}>
          {[this.renderMainTable(), this.renderLeftTable(), this.renderRightTable()]}
        </div>
        {paginatable && (
          <div className={classes.pagination} style={{ width }}>
            <Pagination
              page={page}
              rowsPerPage={rowsPerPage}
              count={this.searchedData.data.length}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

RmTable.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css-api) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Columns of table
   */
  columns: PropTypes.array.isRequired,
  /**
   * Data record array to be displayed
   */
  data: PropTypes.array.isRequired,
  /**
   * Properties applied to the TablePagination Component
   */
  paginationProps: PropTypes.object,
  /**
   * export config
   */
  exportProps: PropTypes.shape({
    type: PropTypes.oneOf(['csv'])
  }),
  /**
   * Properties applied to the Search Component
   */
  searchProps: PropTypes.object,
  /**
   *  if true, it will be a paginatable table
   */
  paginatable: PropTypes.bool,
  /**
   *  if true, it will be a searchable table
   */
  searchable: PropTypes.bool,
  /**
   *  if true, all the columns is resizable
   */
  resizable: PropTypes.bool,
  /**
   *  if true, all the columns is dragable
   */
  dragable: PropTypes.bool,
  /**
   * table width
   */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
  /**
   * table height
   */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.number]),
  /**
   * Callback fired when you drag the column
   */
  onColDrag: PropTypes.func,
};
RmTable.defaultProps = {
  paginationProps: {
    rowsPerPage: 10,
    page: 0,
  },
  width: 'auto',
  height: 'auto',
  searchProps: {
    isDark: true,
  },
  paginatable: false,
  searchable: false,
  resizable: false,
  dragable: false,
};
export default withStyles(styles, { withTheme: true })(RmTable);