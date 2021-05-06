import React from 'react';
import { Field, reduxForm } from 'redux-form';
class StreamCreate extends React.Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }
    renderInput = ({ input, label, meta }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        )
    }
    // we pass in this callback and formvalues will be store in an object.
    onSubmit(formValues) {

    }
    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

// Validation with Redux-Form
const validate = (formValues) => {
    // The error object key have to identical with the Field name, and the error message can be pass.
    const error = {};
    if (!formValues.title) {
        error.title = "You must enter a title"
    }
    if (!formValues.description) {
        error.description = "You must enter a description"
    }
    return error;
};
export default reduxForm({
    form: 'streamCreate',
    validate: validate
})(StreamCreate);