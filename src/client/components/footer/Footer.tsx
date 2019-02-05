import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export interface Props extends WithStyles<typeof styles> {}

const styles = ({ palette, spacing }: Theme) => createStyles({
    footer: {
        padding: spacing.unit * 3,
        borderTop: `1px solid ${palette.primary.main}`,
        color: palette.text.primary
    }
});

class Footer extends React.Component<Props> {
    render() {
        const { classes } = this.props;
        return (
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
        );
    }
  }

export default withStyles(styles)(Footer);
