import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { useSidebarStateValue } from '../shared/state-handler'
import { makeStyles, Theme, createStyles } from '@material-ui/core';
import { drawerWidth } from './sidebar';
import { useLogStateValue } from '../shared/state-handler/logs';
import moment from 'moment-timezone'

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

  const getSeverityStyle = (severity: string) => {
    switch (severity) {
      case 'error': return 'red'
      case 'warn': return 'yellow'
      case 'info': return 'blue'
    }
  }

  return (
    <main className={classes.content}>
      <Paper className={classes.paper}>
        {
          hasMessage() &&
          logState[selectedStreamAndName].map(
            (log, index) => <div ref={(el) => {
              if (index === logState[selectedStreamAndName].length - 1) {
                setLastMessageEl(el);
              }
            }}>
              <label style={{color: getSeverityStyle(log.severity), fontWeight: 'bold'}}>
                {log.severity.toUpperCase()}
              </label>
              <label style={{color: 'grey', fontWeight: 'bold'}}>
                &nbsp; [{
                  moment(new Date(log.date)).tz('America/Sao_Paulo').format('DD/MM/YYYY - HH:mm:ss')
                }]:
              </label>
              <label>
                &nbsp;{log.message}
              </label>
            </div>
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
