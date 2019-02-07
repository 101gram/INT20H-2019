import * as React from 'react';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Info from '@material-ui/icons/InfoOutlined';

// const descriptionHeight = 50;
const styles = () => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        padding: "2px 5px",
        flexGrow: 1,
    },
    infoIcon: {
        float: "left",
        display: "block",
        marginRight: 2
    },
    cardText: {
        display: "flex",
        alignItems: "center"
    }
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
                    <div className={classes.cardText}>    
                        <Info className={classes.infoIcon} color="primary"/>
                        <Typography className="cardText" variant="h5" component="h5">
                        { title }
                        </Typography>
                    </div>
                    <Typography>
                        From Album: {fromAlbum && " true. "} From tag: {fromTag && " true."}
                    </Typography>
                </CardContent>
                {/* <CardActions>
                    <Button size="small" color="primary">
                        View
                    </Button>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                </CardActions> */}
            </Card>
        );
    }
}

export default withStyles(styles)(ImageCard);