import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    componentDidMount() {
        // Load the Google API with auth2
        window.gapi.load('client:auth2', () => {
            // Initialize it with ID and get the object instance with functions.
            window.gapi.client.init({
                clientId: '302421004751-4fjbgsc6d53gvmjtt3jsnvfedsioaoam.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };
    onSignInClick = () => {
        this.auth.signIn();
    };
    onSignOutClick = () => {
        this.auth.signOut();
    }
    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                // We dont call this.onSignOutClick() becuase it will immediately trigger when load up.
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />Sign OUT
                </button>
            )
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />Sign In With Google
                </button>
            )
        }
    }
    render() {
        return (
            <div> {this.renderAuthButton()}</div>
        )
    }
}
const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
};
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);