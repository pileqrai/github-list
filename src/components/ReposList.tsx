import * as React from "react";

export interface IRepoLinks {
    first?: string,
    prev?: string,
    next?: string,
    last?: string,
}

export interface IRepo {
    id: number;
    name: string;
    url: string;
}

export interface IRepoListProps {
    repoList: IRepo[];
    links: IRepoLinks,
    onLinkClick: (link: any) => void;
    notFound?: boolean

}

export default class ReposList extends React.Component<IRepoListProps, {notFound: false}> {
    public render() {
        if (this.props.notFound) {
            return <h4 className="text-danger text-center mt-3">Not found</h4>
        }

        const repos = this.props.repoList.map((repo) => {
            return (
                <div className="list-group-item"
                     key={repo.id}>
                    <a href={repo.url}>
                        {repo.name}
                    </a>
                </div>
            )
        });

        const header = repos.length ? (
            <h3>Results</h3>
        ) : (<h3 className="text-muted">Type GitHub username and hit enter or search button</h3>)


        const pagination = this.props.links && (
            <nav className="mt-3">
                <ul className="pagination justify-content-center">
                    {['first', 'prev', 'next', 'last'].map((id) => {
                        return (<li className={`page-item ${!this.props.links[id] && 'disabled'}`}
                                    key={id}>
                            <button className="page-link"
                                disabled={!this.props.links[id]}
                                    onClick={() => this.props.onLinkClick(this.props.links[id])}>{id}</button>
                        </li>);
                    })}
                </ul>
            </nav>
        );

        return (
        <div className="list-group mt-3">
            <div className="text-center">
                {header}
            </div>
            {repos}
            {pagination}
        </div>
    )
    }
}