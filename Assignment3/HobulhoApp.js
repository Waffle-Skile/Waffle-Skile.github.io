import React, { Component } from 'react';

class HobulhoApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            ans: [],
            num: 0,
            qindex: 0,
            qcount: this.props.questions.length
        };
    }

    handleChange(evt) {
        this.setState({ name: evt.target.value });
    }

    initialize() {
        return (
            <div style={{'max-width': '36rem'}}>
                <h1>Compare your preference with the Mighty {this.props.author}!</h1>
                <hr></hr>
                <form onSubmit={() => this.props.handleUserName(this.state.name)}>
                    <div>
                        <label htmlFor="username">Your name is: </label>
                        <br />
                        <input id="username"
                            placeholder="John Smith"
                            type="text"
                            value={this.state.name}
                            onChange={(evt) => this.handleChange.bind(this)}
                            />
                    </div>
                    <br />
                    <button type="submit" style={{ 'margin-top': '15px' }}
                        onClick={() => this.setState({ name: this.state.name || "John Smith" })}>
                        Click to begin!
                    </button>
                </form>
            </div>
        );
    }

    question() {
        let prog = Math.floor((this.state.qindex + 1) / this.state.qcount * 1000) / 10;
        let style = {
            width: prog + '%',
        }
        return (
            <div>
                <div className="row">
                    <div className="col">
                        {this.props.author}
                    </div>
                    <div className="status">
                        {this.state.qindex + 1} / {this.state.qcount}
                    </div>
                    <div className="progress">
                        <div className="bar" style={style}>{prog}%
                   </div>
                   </div>
                </div><br />
                <h1><b>{this.props.questions[this.state.num].subject + '?'}</b></h1>
                <button type="button"
                    onClick={() => this.setState({ ans: this.state.ans.concat("like"), num: this.state.num + 1, qindex: this.state.qindex + 1, })}>Like</button>
                <button type="button"
                    onClick={() => this.setState({ ans: this.state.ans.concat("dislike"), num: this.state.num + 1, qindex: this.state.qindex + 1, })}>Dislike</button>
            </div>
        );
    }

    badge(n) {
        if (this.state.ans[n] === this.props.questions[n].choice)
            return (
                <p>Coincide: {this.props.questions[n].subject}</p>
            );
        else return (
            <p>Does not coincide: {this.props.questions[n].subject}</p>
        )
    }

    result() {
        let crrct_cnt = 0;
        for (var i = 0; i < this.state.ans.length; i++)
            if (this.state.ans[i] === this.props.questions[i % this.state.qcount].choice)
                crrct_cnt++;

        return (
            <div>
                <h1>Your preferences compared to the Mighty {this.props.author}:</h1>
                <h3>{Math.round((100 * (crrct_cnt % this.state.qcount)) / this.state.qcount)}%</h3>
                <p>User: { this.state.name }</p>
                <p>{crrct_cnt % this.state.qcount} out of {this.state.qcount} coincide!</p>
   
                { this.badge(0) }
                { this.badge(1) }
                { this.badge(2) }
                { this.badge(3) }
                { this.badge(4) }
                { this.badge(5) }
          
                <button type="button"
                    onClick={() => this.setState({ name: null, answer: [], num: 0, qindex: 0 })}>Retry</button>
            </div>
        )
    }

    render() {
        if (this.state.name == null) {
            return (
                <div>
                    {this.initialize()}
                </div>
            );
        }
        else if (this.state.num < this.props.questions.length) {
            return (
                <div>
                    {this.question()}
                </div>
            )
        }
        else{
            return (
                <div>
                    {this.result()}
                </div>
            )
        }
    }
}

export default HobulhoApp;