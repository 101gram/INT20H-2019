import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { test } from '@actions/test';


interface TestProps {
    test?: object;
    hmmm: any;
    classes: {heroButtons: any};
}

class Test extends React.Component<TestProps> {
    static mapStateToProps(store: any) {
        return { test: store.test };
    }

    static mapDispatchToProps(dispatch: any) {
        return { hmmm: () => dispatch(test()) };
    }

    render() {
        const obj : any = this.props.test;
        return (
            <React.Fragment>
                <Typography variant="h6" align="center" color="textSecondary" paragraph>
                    {
                        obj.isFetching ? 
                        "Loading"
                        :
                        obj.data.text ?
                        JSON.stringify(obj.data.text)
                        :
                        `Something short and leading about the collection below—its contents, the creator, etc.
                        Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                        entirely.`
                    }
                    
                </Typography>
                <div className={this.props.classes.heroButtons}>
                    <Grid container spacing={16} justify="center">
                        <Grid item>
                            <Button variant="contained" onClick={this.props.hmmm} disabled={obj.isFetching} color="primary">
                                Main call to action
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary">
                                Secondary action
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(Test.mapStateToProps, Test.mapDispatchToProps)(Test);
