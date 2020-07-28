import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { useSidebarStateValue } from '../shared/state-handler'
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { drawerWidth } from './sidebar';
import { useLogStateValue } from '../shared/state-handler/logs';

const padding = 10
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      padding,
      paddingLeft: padding + drawerWidth
    },
    paper: {
      padding: 10
    }
  }),
);

function LogPanel() {
  const classes = useStyles()
  const logState = useLogStateValue().state
  const { state: { selectedStreamAndName } } = useSidebarStateValue()
  const [ lastMessageEl, setLastMessageEl ] = useState()

  const hasMessage = () => {
    return selectedStreamAndName && logState[selectedStreamAndName].length > 0
  }

  useEffect(() => {
    lastMessageEl && lastMessageEl.scrollIntoView({ behavior: "smooth" });
  })

  return (
    <main className={classes.content}>
      <Paper className={classes.paper}>
        {
          hasMessage() &&
          logState[selectedStreamAndName].map(
            (message, index) => <div ref={(el) => {
              if (index === logState[selectedStreamAndName].length - 1) {
                setLastMessageEl(el);
              }
            }}> {message} </div>
          )
        }
        {
          !hasMessage() &&
          <div style={{textAlign: 'center'}}>
            <h1>No messages found</h1>
          </div>
        }
      </Paper>
    </main>
  );
}

export default LogPanel;
