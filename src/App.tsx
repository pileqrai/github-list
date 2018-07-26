import * as parseLinkHeader from 'parse-link-header';
import * as React from 'react';
import './App.css';

import Axios from "axios";
import ReposList from "./components/ReposList";
import UserNameInput from "./components/UserNameInput";

class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.userNameChangeHandler = this.userNameChangeHandler.bind(this);
        this.linkClickHandler = this.linkClickHandler.bind(this);

        this.state = {
            notFound: false,
            pageNumber: null,
            repos: [],
        }
    }

    public render() {
        return (
            <div className="App container py-5">
                <UserNameInput changeHandler={this.userNameChangeHandler}/>
                <ReposList repoList={this.state.repos}
                           links={this.state.links}
                           notFound={this.state.notFound}
                           onLinkClick={this.linkClickHandler}/>
            </div>
        );
    }

    private linkClickHandler(link: any) {
        this.loadData(link.url, {
            page: link.page,
            per_page: link.per_page,
        });
    }

    private userNameChangeHandler(name: string) {
        this.loadData(`https://api.github.com/users/${name}/repos`);

    }

    private loadData(url: string, params?: object) {
        this.setState({
            notFound: false,
        });

        return Axios.get(url, {
            params: {
                per_page: 20,
                ...params
            }
        }).then(res => {
            console.log(res);

            const links = parseLinkHeader(res.headers.link);

            this.setState({
                links,
                repos: res.data,
            });
        }, () => {
            this.setState({
                notFound: true,
            });
        });
    }
}

export default App;
