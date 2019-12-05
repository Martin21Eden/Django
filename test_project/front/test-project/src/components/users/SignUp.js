import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userSignUpFetch} from '../../store/users/actions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';


const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});


const FIELDS = [
    {
        name: 'username',
        label: 'Username',
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'firstname',
        label: 'Firstname',
    },
    {
        name: 'lastname',
        label: 'Lastname',
    }
];


const InputTextField = ({value, label, name, onChange}) =>
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        value={value}
        onChange={onChange}
    />;


class SignUp extends Component {
    state = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: ''
    };

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.userSignUpFetch(this.state)
    };


    render() {
        const {handleChange} = this;
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        {
                            FIELDS.map(({name, label}) => <InputTextField
                                label={label}
                                name={name}
                                value={this.state.name}
                                onChange={handleChange}
                            />)
                        }

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                        </Button>
                        <Grid container>

                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch, {history}) => ({
    userSignUpFetch: userInfo => dispatch(userSignUpFetch(userInfo, history))
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(SignUp));

