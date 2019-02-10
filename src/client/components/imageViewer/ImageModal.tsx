import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { EP } from '@common/interfaces';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { QueryPhotos } from '@graphql/index';
import * as Moment from 'moment';

const styles = ({ spacing, palette, shadows, breakpoints }: Theme) => createStyles({
    paper: {
        position: 'absolute',
        [breakpoints.between('xs', 'md')]: {
            width: "80%",
            height: "50%",
          },
        [breakpoints.up('md')]: {
            width: spacing.unit * 120,
            height: spacing.unit * 80,
        },
        backgroundColor: palette.background.paper,
        boxShadow: shadows[5],
        padding: 0,
        outline: 'none',
    },
    card: {
        height: '100%',
        display: 'flex',
        [breakpoints.down('xs')]: {
            flexDirection: 'column',
          },
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        [breakpoints.between('xs', 'sm')]: {
            width: '100%'
          },
        [breakpoints.up('sm')]: {
            width: '30%'
        },
    },
    content: {
        flex: '1 0 auto',
        display: "flex" ,
        flexDirection: "column"
    },
    cover: {
        [breakpoints.between('xs', 'sm')]: {
            width: '100%',
            height: '70%'
          },
        [breakpoints.up('sm')]: {
            width: '70%',
            height: '100%'
        },
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: palette.grey[200]
    },
    image: {
        objectFit: "cover",
        maxWidth: '100%',
        height: 'auto',
        maxHeight: "100%"
    },
    heroContent: {
        maxWidth: 1000,
        height: 500,
        margin: `${spacing.unit * 6}px auto`,
    },
    heroUnit: {
        backgroundColor: 'inherit'
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 'auto'
    },
    info: {
        flexGrow: 1,
    }
});

const MODAL_STYLE = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
};



export interface Props extends WithStyles<typeof styles> {
    currentPhoto: QueryPhotos.Data | null;
    cbModalClosed: () => void;
}

class ImageModal extends React.Component<Props>{
   
    handleClose = () => {
        this.props.cbModalClosed();
    }

    render() {
        const { classes } = this.props;

        if(this.props.currentPhoto === null){
            return null;
        }

        const { currentPhoto } = this.props;

        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.props.currentPhoto !== null}
                    onClose={this.handleClose}
                >
                    <div style={MODAL_STYLE} className={classes.paper}>
                        <Card className={classes.card}>
                            <div className={classes.cover}>
                                <img className={classes.image} src={EP.photoToUrl(currentPhoto)}/>
                            </div>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>
                                    <div>    
                                        <Typography variant="h3" color="default">
                                            {currentPhoto.title}
                                        </Typography>
                                        <Typography variant="h5" color="default">
                                            Emotions: {[...new Set(currentPhoto.emotions)].join(", ")}
                                        </Typography>
                                        <Typography variant="h6" color="default">
                                            Date the photo was taken: {Moment(Date.parse(currentPhoto.datetaken)).format('MMMM Do YYYY, h:mm:ss a')}
                                        </Typography>
                                    </div>
                                    <div className={classes.button}>
                                        <Button color="secondary" onClick={this.handleClose}>Close</Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default withStyles(styles)(ImageModal);