import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import TagFaces from '@material-ui/icons/TagFaces';
// import Book from '@material-ui/icons/Book';



const styles = ({ breakpoints}: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    icon: {
        marginRight: 5
    },
    button: {
        color: "white",
        marginLeft: 10,
        [breakpoints.down('sm')]: {
            fontSize: '0.605rem'
        },
    }
});

export interface Props extends WithStyles<typeof styles> {
    
}

class Header extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <TagFaces fontSize="large" className={classes.icon} />
                    <Typography 
                        variant="h6" 
                        color="inherit" 
                        className={classes.grow}
                    >
                        {"Emotion Picker"}
                    </Typography>
                    <Button 
                        className={classes.button} 
                        href="/graphql/"
                    >
                        <div className={classes.icon}>
                            <i className="fas fa-chalkboard-teacher" />
                        </div> 
                        Playground
                    </Button>
                    <Button 
                        className={classes.button} 
                        href="/docs/graphdoc/"
                    >
                        <div className={classes.icon}>
                            <i className="fas fa-book"/>
                        </div>
                        Docs
                    </Button>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
 