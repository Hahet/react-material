import React,{Component,PureComponent}  from 'react';
import {withStyles} from 'react-material/styles';
import {DragSource2, ManualDragTarget, CustomDragLayer} from 'react-material/Drag';


import Button from 'react-material/Button';
import Icon from 'react-material/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Paper from 'react-material/Paper';
import IconButton from 'react-material/IconButton';

import PropTypes from 'prop-types';



const boxstyles = {
    border: '1px dashed gray',
    padding: '0.5rem 1rem',
    cursor: 'move',
    backgroundColor:'white',
    display: 'inline-block',
}

class BoxA extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
    }

    render() {
        return(
            <div style={boxstyles}>I am boxA</div>
        ) 
    }
}




const styles=theme=>({
    root:{
        position:'relative',
        width:'600px',
        height:'400px'
    },
    button:{
        margin:theme.spacing.unit,
    },
    dropTarget:{
        position:'absolute',
        top:'100px',
    }
})
class DragToolBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            snapToGridAfterDrop: false,
        }
    }
    render(){
        const{classes}=this.props;
        const { snapToGridAfterDrop} = this.state
        return (
            <div className={classes.root}>
                <div>
                    <DragSource2 type='OUTITEM' dragSourceType='BUTTONB'>
                        <Button variant="fab" disabled aria-label="delete" className={classes.button}>
                             <DeleteIcon />
                        </Button>
                    </DragSource2>
                   <DragSource2 type='OUTITEM' dragSourceType='BUTTONC'>
                        <IconButton color="primary" className={classes.button} component="span">
                            <PhotoCamera />
                        </IconButton>
                    </DragSource2> 
                   <DragSource2 type='OUTITEM' dragSourceType='BOXA'>
                        <BoxA />
                    </DragSource2> 
                </div>


                <ManualDragTarget accepts={['BOXA','BUTTONB','BUTTONC']} snapToGrid={snapToGridAfterDrop} classes={{custom:classes.dropTarget}}>
                </ManualDragTarget>
                <p>
                    <label htmlFor="snapToGridAfterDrop">
                        <input
                            id="snapToGridAfterDrop"
                            type="checkbox"
                            checked={snapToGridAfterDrop}
                            onChange={this.handleSnapToGridAfterDropChange.bind(this)}
                        />
                        <small>Snap to grid after drop</small>
                    </label>
                </p>             
            </div>
        )
    }
    handleSnapToGridAfterDropChange() {
        this.setState({
            snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
        })
    }
}
export default withStyles(styles)(DragToolBox);