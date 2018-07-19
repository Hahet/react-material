import React from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import Table from '../../Table';
import TableBody from '../../TableBody';
import TableCell from '../../TableCell';
import TableHead from '../../TableHead';
import TableRow from '../../TableRow';
import Scrollbar from '../../Scrollbar'

import {
  withStyles
} from '../../styles';

const styles = (theme)=> ({
  root: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: 'fit-content'
  },
  layoutFixed: {
    tableLayout: 'fixed',
  },
})
const colStyle = {
  // width: 150,
  minWidth: 100,
}

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  componentDidMount(){
    
  }

  render() {
    const {
      classes,
      data,
      columns,
      type,
      scroll,
      tableRef,
      bodyRef,
      bodyRowHeight,
      height
    } = this.props
    const rowStyle = {
      height: bodyRowHeight
    }
    return (
      <div 
        ref = {
          tableRef
        }
        onScroll = {
          (e) => {
            scroll(e, type)
          }
        }
        style = {
          {
            height: height
          }
        }
        className = {
          classes.root
        }
      >
        <Table innerRef={bodyRef} classes={{root:classes.layoutFixed}}  className={classes.table}>
          <colgroup>
            {
              columns.map((item) => {
                return <col key={item.title} style={colStyle} width={item.width}></col>
              })
            }
          </colgroup>
          <TableBody>
            {data.map(entry => {
              return (
                <TableRow style={rowStyle} key={entry.key}>
                  {columns.map((column) => {
                    return (
                      <TableCell>
                        {
                          column.render ? column.render() : entry[column.dataIndex]
                        }
                      </TableCell>
                    )
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Body.propTypes = {
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  classes: PropTypes.object.isRequired,
}
Body.defaultProps = {
  height: 'auto'
}

export default withStyles(styles)(Body);