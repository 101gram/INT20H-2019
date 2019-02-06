import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import classNames from 'classnames';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Test from '@containers/test';
// import CardImage from '@components/card/MainImage';
import ImageCard from '@components/imageCard/Card';
// import MediaControlCard from '@components/imageViewer/MainImage';

const styles = ({ palette, spacing, breakpoints}: Theme) => createStyles({
    icon: {
        marginRight: spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: palette.background.paper,
    },
    heroContent: {
        //color: "#000",
        maxWidth: 600,
        margin: '0 auto',
        padding: `${spacing.unit * 8}px 0 ${spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: spacing.unit * 3,
        marginRight: spacing.unit * 3,
        [breakpoints.up(1100 + spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${spacing.unit * 8}px 0`,
    },
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
  
// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const cardsObjects = [
    {
        id: 1,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 2,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 3,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 4,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 5,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 6,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 7,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 8,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 9,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 10,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 11,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 12,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    }
];

export interface Props extends WithStyles<typeof styles> {}

class Main extends React.Component<Props> {
    /*
        // For sample
        count = 0; 
        handler = async () => {
            this.count++;
        } 
    */   

    render() {
        const { classes } = this.props;
        return (
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Album layout
                        </Typography>
                        {/* <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Main call to action
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Secondary action
                                    </Button>
                                </Grid>
                            </Grid>
                        </div> */}
                        <Test classes={classes}/>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {cardsObjects.map(card => (
                            <Grid item key={card.id} sm={6} md={4} lg={3}>
                                <ImageCard {...card}/>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </main>
        );
    }
}

export default withStyles(styles)(Main);