import React, { Component } from "react";

export class Form extends Component {
    timeout = null;

    constructor() {
        super();

        this.state = {
            count: 0,
            count1: 0,
        }
    }

    // componentDidUpdate() {
    //     this.timeout = setInterval(() => {
    //         alert("Hello is this Did Mount, Hello User");
    //     }, 5000);
    // }

    // componentWillUnmount() {
    //     clearInterval(this.timeout);
    // }


    // componentDidUpdate() {
    //     console.log("Hello in Compo Did Update");
    // }

    // componentDidMount() {
    //     console.log("Hello in Compo Did Mount");
    // }
    

    render() {
        return (
            <>
                <h1>Hello In Class Component: {this.state.count} ----- Count1: {this.state.count1}</h1>
                <button
                className="text-yellow-50 border border-black bg-blue-400 mx-10"
                onClick={() => this.setState({
                    count: this.state.count + 1
                })}>
                    Increment Count
                </button>

                <button
                className="text-yellow-50 border border-black bg-blue-400 mx-10"
                onClick={() => this.setState({
                    count1: this.state.count1 + 1
                })}>
                    Increment Count1
                </button>
            </>
        )
    }
}

export class AuthClassDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuth: false
        }
    }
    
    render() {
        const  { Form } = this.props;

        if(this.state.isAuth) {
            return <Form />
        }

        return (
            <h1>
                Acces denined for class !
            </h1>
        )
    }
}