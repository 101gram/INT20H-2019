import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { EP } from '@common/interfaces';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const styles = ({ spacing, palette, shadows, breakpoints }: Theme) => createStyles({
    paper: {
        position: 'absolute',
        [breakpoints.between('xs', 'md')]: {
            width: "80%",
            height: "50%",
          },
        [breakpoints.up('md')]: {
            width: spacing.unit * 100,
            height: spacing.unit * 60,
        },
        backgroundColor: palette.background.paper,
        boxShadow: shadows[5],
        padding: spacing.unit * 4,
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
    },
    cover: {
        [breakpoints.between('xs', 'sm')]: {
            width: '100%',
            height: '70%'
          },
        [breakpoints.up('sm')]: {
            width: '70%', // ща погодь есть вроде в цсс такая тема, с курсача ща вазьму во т
            height: '100%'
        },
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: palette.grey[200]
    },
    image: {
        objectFit: "cover",
        width: '100%',
        height: 'auto'
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
        justifyContent: 'flex-end'
    }
});

const MODAL_STYLE = {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
};



export interface Props extends WithStyles<typeof styles> {
    currentPhoto: EP.Photo | null;
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
                                <img className={classes.image} src={EP.photoToUrl(this.props.currentPhoto!)}/>
                            </div>
                            <div className={classes.details}>
                                <CardContent className={classes.content}>    <Typography variant="h5" color="default">
                                        {this.props.currentPhoto!.title}
                                    </Typography>
                                    <div className={classes.button}>
                                        <Button onClick={this.handleClose}>Close</Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    </div>
                </Modal>
            </div>
        );
    }
} // ку ку епта <!DOCTYPE html>

export default withStyles(styles)(ImageModal);