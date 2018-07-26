import * as React from "react";

export interface IUserNameInputProps {
    changeHandler: (value: string) => void,
}

export default class UserNameInput extends React.Component<IUserNameInputProps, any> {
    constructor(props: IUserNameInputProps) {
        super(props);
        this.state = {
            username: '',
        }
        this.searchForRepos = this.searchForRepos.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    public handleChange(e: React.FormEvent<HTMLInputElement>) {
        this.setState({
            username: e.currentTarget.value,
        });
    }

    public handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        this.setState({
            username: e.currentTarget.value,
        })
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.searchForRepos();
        }
    }

    public searchForRepos() {
        this.props.changeHandler.call(this, this.state.username);
    }

    public render() {
        return (
            <div className="UserNameInput">
                <div className="input-group">
                    <input
                        type="text"
                        name="username"
                        id="username"
                        className="form-control"
                        placeholder="Please type username"
                        value={this.state.username}
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        aria-describedby="sufixId"/>
                    <button className="btn btn-primary"
                            onClick={this.searchForRepos}
                            disabled={!this.state.username}>
                        Search
                    </button>
                </div>
            </div>
        )
    }
}