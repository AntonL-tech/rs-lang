import React, { Component } from "react";

class Clock extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            kv: 60
        };
    }

    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }

    toOffsetKv(offset) {
        return offset-1;
    }

    tick() {
        this.setState({
            kv: this.toOffsetKv(this.state.kv)
        });
    }

    render() {
        return (
            <p className="App-clock">
                {this.state.kv >= 0 ? this.state.kv : 'finish'}
            </p>
        );
    }
}

export default Clock;
