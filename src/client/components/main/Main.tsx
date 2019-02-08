import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { EP } from '@common/interfaces';
import ImageGridViewer from '@components/imageCard/GridViewer';
// import MediaControlCard from '@components/imageViewer/MainImage';
// import ImageReplacer from '@components/imageViewer/ImageReplacer';

const styles = ({  spacing }: Theme) => createStyles({
    icon: {
        marginRight: spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: 'inherit'//palette.background.paper, 
    },
    heroContent: {
        maxWidth: 1000,
        height: 500,
        margin: `${spacing.unit * 6}px auto`,
        //margin: `${spacing.unit * 8}px auto ${spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: spacing.unit * 4,
    },
});
  

export interface Props extends WithStyles<typeof styles> {}

interface State {
    currentPhoto: EP.Photo | null;
}

class Main extends React.Component<Props, State> {
    state = {
        currentPhoto: null
    };

    render() {
        const { classes } = this.props;
        return (
            <main>
                <div className={classes.heroUnit}>
                    {/* <div className={classes.heroContent}>
                        <MediaControlCard 
                            isDisabled={this.state.currentPhoto !== null} currentPhoto={this.state.currentPhoto./>
                    </div>  */}
                </div>
                <ImageGridViewer />
            </main>
        );
    }
}

export default withStyles(styles)(Main);
