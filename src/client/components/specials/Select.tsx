// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles, withTheme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// const styles = theme => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     color: "white",
//     palette: {
//         textColor: "white",
//         }
//   },
//   formControl: {
//     margin: theme.spacing.unit,
//     minWidth: 120
//   },
//   selectEmpty: {
//     marginTop: theme.spacing.unit * 2,
//   },
//   input: {
//     color: "white"
//   },
//   palette: {
//     textColor: "white",
//     }
// });

// class SimpleSelect extends React.Component {
//   state = {
//     age: '',
//     name: 'hai',
//     labelWidth: 0,
//   };

//   handleChange = event => {
//     this.setState({ [event.target.name]: event.target.value });
//   };

//   render() {
//     const { classes } = this.props;

//     return (
//       <form className={classes.root} autoComplete="off">
        
//         <FormControl className={classes.formControl}>
//           <Select
//             value={this.state.age}
//             onChange={this.handleChange}
//             displayEmpty
//             name="age"
//             color="white"
//             className={classes.selectEmpty}
//           >
//             <MenuItem value="" color="white">
//               <em>All</em>
//             </MenuItem>
//             <MenuItem color="white" value={10}>Ten</MenuItem>
//             <MenuItem color="white" value={20}>Twenty</MenuItem>
//             <MenuItem color="white" value={30}>Thirty</MenuItem>
//           </Select>
//           <FormHelperText>Choosen emotion</FormHelperText>
//         </FormControl>
//       </form>
//     );
//   }
// }

// SimpleSelect.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SimpleSelect);
