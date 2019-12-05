import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'

const styles = theme => ({

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        width: '100%', // Fix IE 11 issue.
    },
});

class FormPost extends Component {
    state = {
        title: '',
        content: '',
    };
    handleChange = event => {

        this.setState({
            [event.target.name]: event.target.value
        });


    };


    componentWillReceiveProps(newProps){
      if (this.props.title !== newProps.title ) {
           this.setState({
               title: newProps.title
           })
      }
      if (this.props.content !== newProps.content ) {
           this.setState({
               content: newProps.content
           })
      }
}


    render() {
        const {classes, onSubmit, id, history} = this.props;
        return (
            <form className={classes.form} noValidate onSubmit={e => {
                e.preventDefault()
                onSubmit(this.state, id, history)
            }}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    autoComplete="title"
                    value={this.state.title}
                    onChange={this.handleChange}
                    autoFocus
                />
                <TextField
                    id="outlined-multiline-static"
                    required
                    label="Content"
                    name="content"
                    multiline
                    rows="6"
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    value={this.state.content}
                    onChange={this.handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Post
                </Button>
                <Grid container>

                </Grid>
            </form>
        );
    }
}


export default withRouter(withStyles(styles)(FormPost));

