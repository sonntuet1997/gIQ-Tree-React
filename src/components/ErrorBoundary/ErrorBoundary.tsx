import React, {Component, SuspenseProps} from 'react';

export default class ErrorBoundary extends Component<SuspenseProps> {
    state = {hasError: null, error: null};

    static getDerivedStateFromError(error: any) {
        return {
            hasError: true,
            error
        };
    }

    componentDidCatch(error: Error) {
        this.setState({
            hasError: true,
            error
        });
    }

    render() {
        const Fallback: any = this.props.fallback;
        if (this.state.hasError) {
            return (<Fallback error={this.state.error}/>);
        }
        return this.props.children;
    }
}

