import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { EP } from "@common/interfaces";
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';

const styles = ({ palette, spacing }: Theme) => createStyles({
    formControl: {
        margin: spacing.unit * 3,
        width: 550
    },
    formLabel: {
        color: palette.secondary.main,
        textAlign: 'center',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    chip: {
        margin: spacing.unit / 4,
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center'
    },
    labelHelper: {
        position: 'initial'
    }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

  

export interface Props extends WithStyles<typeof styles> {}

class EmotionFilter extends React.Component<Props> {
    state = {
        selectedEmotions: []
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedEmotions: event.target.value });
    }

    renderSelectValue = (selected: SelectProps["value"]) => {
        const { classes } = this.props; 
        const arr = selected as [];
        return (
            <div className={classes.chips}>
                {arr!.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                ))}
            </div>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h6" component="h6" className={classes.formLabel}>You can choose emotions to filter pictures by:</Typography>
                <div className={classes.formContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.labelHelper} htmlFor="select-multiple-chip">Select the emotions</InputLabel>
                        <FormGroup>
                            <Select
                                multiple
                                value={this.state.selectedEmotions}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={this.renderSelectValue} 
                                MenuProps={MenuProps}
                            >
                            {EP.PossibleEmotions.map(value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormGroup>
                        <FormHelperText>Choose emotions to filter them</FormHelperText>
                    </FormControl>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EmotionFilter);
