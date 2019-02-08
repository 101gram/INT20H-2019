import * as React from 'react';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = ({ spacing }: Theme) => createStyles({
    heroUnit: {
      backgroundColor: "inherit"//palette.background.paper,
    },
    heroContent: {
      maxWidth: 600,
      margin: '0 auto',
      padding: `${spacing.unit * 8}px 0 ${spacing.unit * 6}px`,
    }
});

export interface Props extends WithStyles<typeof styles> {
    isDisabled: boolean;
}

class ImageReplacer extends React.Component<Props>{
    render() {
        const { classes } = this.props;
        if(this.props.isDisabled){
            return null;
        }
        return(
            <div className={classes.heroUnit}>
                <div className={classes.heroContent}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                        Emotion picker
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Welcome everyone! Our site allows you to get pictures, which are related to INT20H-2019 from Flickr and to sort
                        them by emotions on people's faces. Have a great fun using it!
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ImageReplacer);