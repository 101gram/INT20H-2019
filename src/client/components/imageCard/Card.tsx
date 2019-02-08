import * as React from 'react';
import { createStyles, withStyles, WithStyles,  Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';
// import Button from '@material-ui/core/Button';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Info from '@material-ui/icons/InfoOutlined';
import PhotoAlbum from '@material-ui/icons/PhotoAlbumOutlined';

// const descriptionHeight = 50;
const styles = ({ palette }: Theme) => createStyles({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        padding: "2px 10px",
        flexGrow: 1,
        backgroundColor: palette.grey[200]
    },
    infoIcon: {
        float: "left",
        display: "block",
        marginRight: 2
    },
    cardText: {
        display: "flex",
        alignItems: "center"
    },
    iconHashTag: {
        fontWeight: "bold",
        color: palette.secondary.main,
        marginRight: 3
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
    renderAlbum() {
        return (
            <div>
                <PhotoAlbum className="iconFloat" fontSize="small" color="secondary"/>
                <Typography className="d-inline-block">
                    INT20h 
                </Typography>
            </div>
        );
    }

    renderTag(clasIcon: string) {
        return (
            <div className="f-right">
                <i className={clasIcon}>#</i>
                <Typography className="d-inline-block">
                    int20h
                </Typography>
            </div>
        );
    }

    render() {
        const { classes, title, imgUrl, fromAlbum, fromTag } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={imgUrl}
                    title={title}
                />
                <CardContent className={classNames(classes.cardContent, "cardContent")}> 
                    <div className={classes.cardText}>    
                        <Info className={classes.infoIcon} color="primary"/>
                        <Typography className="cardText" variant="h5" component="h5">
                        { title }
                        </Typography>
                    </div>
                    <div>
                        {fromTag   && this.renderTag(classes.iconHashTag)}
                        {fromAlbum && this.renderAlbum()}
                    </div>
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