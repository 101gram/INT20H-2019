import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import ImageCard from '@components/imageCard/Card';
import Paginator from '@components/imageCard/Paginator';
import { PhotosState } from "../../actions/fetchPhotos";
import { connect } from 'react-redux';
import { ApplicationStore } from '@configs/configureReduxStore';
import { fetchPhotos, FetchPhotosThunkDispatch } from '@actions/fetchPhotos';
import EmotionFilter from '@components/imageCard/EmotionFiter';
 
const styles = ({ spacing, breakpoints}: Theme) => createStyles({
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
        padding: `0 0 ${spacing.unit * 2}px 0`,
    }
});

//#region 
const cardsObjects = [
    {
        id: 1,
        title: "Bla-bla FDGDdbcbfhtdjhggfggh",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 2,
        title: "Bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: true
    },
    {
        id: 3,
        title: "Bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: true,
        fromTag: false
    },
    {
        id: 4,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: false,
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
        fromAlbum: false,
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
        fromTag: false
    },
    {
        id: 12,
        title: "bla-bla",
        imgUrl: "https://trainpix.org/photo/02/31/63/231636.jpg",
        fromAlbum: false,
        fromTag: true
    }
];
//#endregion

export interface Props extends WithStyles<typeof styles> {
    photos: PhotosState;
    getAllPhotos: Function;
}

class ImageGridViewer extends React.Component<Props> {
    static mapStateToProps(store: ApplicationStore) {
        return { photos: store.photos };
    }

    static mapDispatchToProps(dispatch: FetchPhotosThunkDispatch) {
        return { getAllPhotos: () => dispatch(fetchPhotos()) };
    }

    handleClickNavigation = (_e : any) => {
        if (!this.props.photos.isFetching) {
            // const page = _e.currentTarget.getAttribute("offset") / 12;
            // if (!page) return;
            // this.props.getAllPhotos(page);
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <EmotionFilter />
                    <Grid container spacing={40}>
                        {cardsObjects.map((card, _index) => (
                            <Grid item key={card.id} xs={12} sm={6} md={4} lg={3}>
                                <ImageCard {...card}/>
                            </Grid>
                        ))} 
                    </Grid>
                </div>
                <Paginator 
                    currentPage={this.props.photos.currentPage} 
                    allPages={this.props.photos.allPages} 
                    total={this.props.photos.countAllPhotos} 
                    isFetching={this.props.photos.isFetching} 
                    cbPageChanged={this.handleClickNavigation} 
                />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(connect(ImageGridViewer.mapStateToProps, ImageGridViewer.mapDispatchToProps)(ImageGridViewer));