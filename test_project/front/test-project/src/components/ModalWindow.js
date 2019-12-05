import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


class Modal extends Component {
    state = {
        isExpanded: false,
        isOpened: false,
    };


    handleOpenClick = () => {
        this.setState(({isOpened}) => ({isOpened: !isOpened}));

    };

    componentDidMount = () => {return this.handleOpenClick()}

    render = () => {
        const { id, title, content, onClick } = this.props;
        return <div>

            <Dialog
                open={this.state.isOpened}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.handleOpenClick}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
                <DialogContent>

                    <DialogContentText id="alert-dialog-slide-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleOpenClick} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={()=>onClick(id)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}


export default Modal;