import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from 'react-material/styles/withStyles';
import Grid from 'react-material/Grid';
import Button from 'react-material/Button';
import classnames from 'classnames';
import "babel-polyfill";
//颜色需要替换
const style = theme => ({
  label: {
    fontSize:'13px',
    display:'inline-block',
    width:'7em',
    color:'rgba(255,255,255,0.7)',
    lineHeight: '2.6em',
    textAlign: 'left'
  },
  labelDark:{
    color:'rgba(0,0,0,0.7) !important'
  },
  content: {
    flex: 1
  },
  btn: {
    fontSize: '13px',
    lineHeight: '2.6em',
    padding: '0',
    minHeight: '0',
    background: 'none',
    boxShadow: 'none',
    borderRadius: '1.3em',
    color:'rgba(255,255,255,0.8)',
    fontWeight:'400',
    '&:hover':{
        background: 'rgba(0,0,0,0.05)',
    }
  },
  btnDark:{
    color:'rgba(0,0,0,0.7)'
  },
  active: {
    background: 'rgba(0,0,0,0.2)',
        '&:hover':{
            background: 'rgba(0,0,0,0.15)',
    }
  },
  activeDark:{
  }
});

class Filters extends Component {
  onClick = selectItem => () => {
    const {multi, onChange, value, mapProps} = this.props;
    const selectVal = selectItem[mapProps.value];
    let newVal;

    if (!multi) {
      if (this.isSelected(selectVal)) {
        newVal = [];
      } else {
        newVal = [selectVal];
      }
    } else {
      if (this.isSelected(selectVal)) {
        newVal = value.filter(v => v !== selectVal);
      } else {
        newVal = [...value, selectVal];
      }
    }
    onChange(newVal);
  };

  isSelected = value => this.props.value.includes(value);

  render() {
    const {classes, options, label, mapProps, spacing,type} = this.props;
    return (
      <Grid container spacing={8}>
        <Grid item className={(type=='dark'?classes.labelDark:'')+' '+classes.label}>{label}</Grid>
        <Grid item className={classes.content}>
          <Grid container spacing={spacing}>
            {options.map(s => {
              const value = s[mapProps.value];
              const isSelected = this.isSelected(value);
              const className = classnames(isSelected && classes.active);
              const className1 = classnames(type=='dark' && classes.btnDark);

              return (
                <Grid item>
                  <Button
                    className={className+' '+className1}
                    classes={{
                      root: classes.btn
                    }}
                    key={value}
                    onClick={this.onClick(s)}
                  >
                    {s[mapProps.label]}
                  </Button>
                </Grid>
              )
            })
            }
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Filters.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * callback to parent component when select option
   */
  onChange: PropTypes.func,
  /**
   * data options.
   */
  options: PropTypes.array,
  /**
   * singleSelect or multiSelect default is singleSelect.
   */
  multi: PropTypes.bool,
  value: PropTypes.array,
  /**
   * label name
   */
  label: PropTypes.string,
  /**
   * map data options struct
   */
  mapProps: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  spacing: PropTypes.number
};

Filters.defaultProps = {
  options: [],
  value: [],
  multi: false,
  label: '',
  mapProps: {
    label: 'label',
    value: 'value'
  },
  onChange() {
    console.log('请添加回调函数');
  },
  spacing: 8
};

export default withStyles(style)(Filters);
