import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { EP } from '@common/interfaces';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = () => createStyles({
    card: {
        height: '100%',
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '30%'
    },
    content: {
        flex: '1 0 auto',
    // 
    },
    cover: {
        width: '70%'
    }
});

export interface Props extends WithStyles<typeof styles> {
    isDisabled: boolean;
    currentPhoto: EP.Photo | null;
}

class MediaControlCard extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        if(this.props.isDisabled){
            return null;
        }
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cover}
                    image="https://static.spin.com/files/140522-jack-white-meg-interview-640x426.jpg"
                    title="Live from space album cover"
                />
                <div className={classes.details}>
                    <CardContent className={classes.content}>    <Typography variant="h5" color="default">
                            Hello World
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Subtitle
                        </Typography>
                    </CardContent>
                </div>
            </Card>
        );
    }
}

export default withStyles(styles)(MediaControlCard);