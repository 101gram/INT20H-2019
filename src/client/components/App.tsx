import * as React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '@theme/index';
import Header from '@components/header/Header';
import Footer from '@components/footer/Footer';
import Main from '@components/main/Main';
// import { FlickrService } from '@services/FlickrService';
import { Provider } from 'react-redux';
import store from '@configs/configureReduxStore'; 


// (async () => {
//     console.dir(await new FlickrService().fetchPhotoes({
//         page: 1,
//         per_page: 10
//     }));
// })().then(() => {});

export const MyContext = React.createContext({});
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <MuiThemeProvider theme={ theme }>
                    <CssBaseline />
                    <Header />
                    <Main />
                    <Footer />
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;