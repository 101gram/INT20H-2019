import * as React from 'react';
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';

const styles = () => createStyles({
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    }
});

export interface Props extends WithStyles<typeof styles> {}

class MediaControlCard extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" color="default">
                            Hello World
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Subtitle
                        </Typography>
                    </CardContent>
                </div>
                <CardMedia
                    className={classes.cover}
                    image="/static/images/cards/live-from-space.jpg"
                    title="Live from space album cover"
                />
            </Card>
        );
    }
}

export default withStyles(styles)(MediaControlCard);