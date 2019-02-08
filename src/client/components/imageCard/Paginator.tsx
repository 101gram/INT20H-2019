import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import NextIcon from '@material-ui/icons/NavigateNext';
// import PreviousIcon from '@material-ui/icons/NavigateBefore';
import Pagination from "material-ui-flat-pagination";

const styles = ({ spacing }: Theme) => createStyles({
    navBarBottom: {
        paddingBottom: spacing.unit * 3,
        boxSizing: "content-box",
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
    },
    pagination: {

    }
});

export interface Props extends WithStyles<typeof styles> {
    currentPage:   number;
    allPages:      number;
    total:         number;
    isFetching:    boolean; // stop
    cbPageChanged: Function;    
}

class Paginator extends React.Component<Props> {

    handleChange = (_event: any, value: any) => {
        this.setState({ value });
    }

    render() {
        // const { value } = this.state;
        const { classes } = this.props;

        return (
            <div className={classes.navBarBottom}>
                <Pagination
                    limit={12}
                    offset={(this.props.currentPage - 1) * 12}
                    total={this.props.total}
                    onClick={this.props.cbPageChanged()}
                    currentPageColor="default"
                    otherPageColor="secondary"
                    size="large"
                    outerButtonCount={1}
                    innerButtonCount={1}
                />
            </div>
        );
    }
}

export default  withStyles(styles)(Paginator);
