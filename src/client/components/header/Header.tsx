import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
import TagFaces from '@material-ui/icons/TagFaces';

const styles = createStyles({
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
    }
});

export interface Props extends WithStyles<typeof styles> {
    
}

class Header extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        //const siteName = this.context;
        return (
            <AppBar  position="static">
                <Toolbar>
                    {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    <TagFaces fontSize="large" className={classes.icon} />
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {"Emotion Picker"}
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Header);
