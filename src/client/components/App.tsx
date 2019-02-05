import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@theme/index';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Main from '@components/main/Main';

export interface State extends React.ComponentState {
    siteName: string;
}


export const MyContext = React.createContext({});
class App extends React.Component<{}, State> {
    constructor(props : {}) { 
        super(props);
        this.setState({
            siteName: ""
        });
    }
    
    render() {
        return (
            <MuiThemeProvider theme={ theme }>

                <CssBaseline />
                <Header />
                <Main />
                <Footer />
                
            </MuiThemeProvider>
        );
    }
}
export default App;