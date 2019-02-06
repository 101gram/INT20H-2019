import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = () => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

export interface Props extends WithStyles<typeof styles> {
    id: number;
    title: string;
    imgUrl: string;
    fromAlbum: boolean;
    fromTag: boolean;
}

class ImageCard extends React.Component<Props> {
    render() {
        const { classes, title, imgUrl, fromAlbum, fromTag } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={imgUrl}
                    title={title}
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        { title }
                    </Typography>
                    <Typography>
                        This is a media card. {fromAlbum && " From Album."} {fromTag && " From Tag."}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        View
                    </Button>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                </CardActions>
            </Card>
        );
    }
}

export default withStyles(styles)(ImageCard);