import React from 'react';
import { I18n } from '@aws-amplify/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import LanguageSelect from '../../Components/LanguageSelect/languageSelect';

import { strings } from './languageStrings';
I18n.putVocabularies(strings);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    paddingBottom: theme.spacing(6),
    boxShadow: '0 0 black',
    textAlign: 'center',
    fontSize: 'xxx-large',
    fontWeight: 'bold'
  },
  contentHead: {
    paddingBottom: theme.spacing(3),
    boxShadow: '0 0 black',
    textAlign: 'center',
    fontSize: 'large',
    fontWeight: 'bold'
  },
  contentText: {
    paddingBottom: theme.spacing(6),
    boxShadow: '0 0 black'
  },
  contentFooter: {
    boxShadow: '0 0 black'
  }
}));

export default function TosContent() {
  const classes = useStyles();
  const [lang, setLang] = React.useState('en');
  const version = '1.0.0';

  const handleChange = (event) => {
    setLang(event);
  }

  return (
    <div className={classes.root}>
      <LanguageSelect lang={lang} newLang={handleChange}/>

      <Grid container justify="center" spacing={2}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          <Paper className={classes.title}>
            {I18n.get("TITLE")}
          </Paper>
          <Paper className={classes.contentHead}>
            {I18n.get("P1")}
          </Paper>
          <Paper className={classes.contentText}>
            {I18n.get("LOREM_IPSUM")}
          </Paper>
          <Paper className={classes.contentHead}>
            {I18n.get("P2")}
          </Paper>
          <Paper className={classes.contentText}>
            {I18n.get("LOREM_IPSUM")}
          </Paper>
          <Paper className={classes.title}>
            ...
          </Paper>
          <Paper className={classes.contentFooter}>
            <hr />
            Version: {version}
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
}