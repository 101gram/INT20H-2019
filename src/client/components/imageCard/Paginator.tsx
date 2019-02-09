import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import classnames from 'classnames';
// import BottomNavigation from '@material-ui/core/BottomNavigation';
// import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// import NextIcon from '@material-ui/icons/NavigateNext';
// import PreviousIcon from '@material-ui/icons/NavigateBefore';
import Typography from '@material-ui/core/Typography';
import Pagination from "material-ui-flat-pagination";
// import { Theme } from '@material-ui/core/styles';
// import { unstable_useMediaQuery as useMediaQuery } from '@material-ui/core/useMediaQuery';

export const IMAGES_PER_PAGE = 12;

const styles = ({ spacing }: Theme) => createStyles({
    navBarBottom: {
        paddingBottom: spacing.unit * 3,
        boxSizing: "content-box",
        display: "flex", 
        alignItems: "center",
        justifyContent: "center"
    },
    description: {
        marginTop: 8
    }
});

export interface Props extends WithStyles<typeof styles> {
    currentPage:   number;
    total:         number;
    cbPageChanged: (e: object, offset: number, page: number) => void;   
    isDisabled:    boolean; 
}

// function getPaginotorSize() {
//     if (useMediaQuery('(min-width:768px)')) {
//         return 'large';
//     } else if (useMediaQuery('min-width: 576px')) {
//         return 'medium';
//     } else {
//         return 'small';
//     }
// }

// function hmm() {
//     const bbb = getPaginotorSize();
//     return (
//         <div>
//             {bbb ? "asd" : "ASD"}
//         </div>
//     );
// }


class Paginator extends React.Component<Props> {

    handleChange = (_event: any, value: any) => {
        this.setState({ value });
    }

    render() {
        // const { value } = this.state;
        const { classes } = this.props;
        const { currentPage, total, isDisabled, cbPageChanged } = this.props;
        const offset = (currentPage - 1) * 12;
        if (total === 0) return <div />;
        //const matches = getPaginotorSize();
        return (
            <React.Fragment>
                <Typography className={classnames("m-y", classes.description)} variant="subtitle1" align="center" color="default" paragraph>
                    {currentPage * 12 > total ? total - offset : IMAGES_PER_PAGE} images was viwed from {total} avaliable.<br/>
                    You are on {currentPage} page of {Math.ceil(this.props.total / IMAGES_PER_PAGE)}.
                    <br />
                </Typography>
                <div className={classes.navBarBottom}>
                    {this.props.total / IMAGES_PER_PAGE > 1.0 && 
                        <Pagination
                            limit={IMAGES_PER_PAGE}
                            offset={offset}
                            total={total}
                            onClick={cbPageChanged}
                            currentPageColor="default"
                            otherPageColor="secondary"
                            size={'large'}
                            outerButtonCount={1}
                            innerButtonCount={1}
                            disabled={isDisabled}
                        />
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default  withStyles(styles)(Paginator);
