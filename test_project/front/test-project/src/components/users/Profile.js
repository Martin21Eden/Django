import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProfileFetch} from '../../store/users/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


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

class Profile extends Component {
    state = {
        username: '',
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

    componentDidMount() {
        const {getProfileFetch, usersState} = this.props;
        // if (usersState.currentUser===0) {
        //     console.log(usersState.currentUser, 'usersState.currentUser')
        //     getProfileFetch();
        //
        // }
        getProfileFetch();

    }

    componentWillReceiveProps(newProps) {
        if (this.state.username !== newProps.usersState.currentUser.username) {
            this.setState({
                username: newProps.usersState.currentUser.username
            })
        }

        if (this.state.firstname !== newProps.usersState.currentUser.first_name) {
            this.setState({
                firstname: newProps.usersState.currentUser.first_name
            })
        }

        if (this.state.lastname !== newProps.usersState.currentUser.last_name) {
            this.setState({
                lastname: newProps.usersState.currentUser.last_name
            })
        }

        if (this.state.email !== newProps.usersState.currentUser.email) {
            this.setState({
                email: newProps.usersState.currentUser.email
            })
        }

    }

    render() {
        const {handleChange} = this;
        const {classes, usersState} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        {
                            FIELDS.map(({name, label}) => <InputTextField
                                label={label}
                                name={name}
                                value={this.state[name]}
                                onChange={handleChange}
                            />)
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save
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
    getProfileFetch: () => dispatch(getProfileFetch(history))
});
const mapStateToProps = ({usersState}) => ({usersState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile));

