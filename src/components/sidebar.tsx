import React, { useEffect, useRef } from "react"
import {
  List,
  Collapse,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  createStyles,
  Theme,
  CssBaseline
} from "@material-ui/core"

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import FiberManualRecordOutlinedIcon from '@material-ui/icons/FiberManualRecordOutlined';

import { useSocketServiceValue, IOnAppend } from "../service/socket.sevice";
import { useSidebarStateValue } from "../shared/state-handler";
import { buildLogKey } from "../utils/log.utils";
import { useLogStateValue } from "../shared/state-handler/logs";
import { useConfigurationServiceValue } from "../service/configuration.service";
import { TLogMetadataHashed } from "../service/log.service";

export const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      paddingTop: 64
    },
    sublistItem: {
      paddingLeft: '30px'
    },
    drawerPaper: {
      width: drawerWidth,
      marginTop: 64
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
  }),
);

export const Sidebar = () => {
  const classes = useStyles();
  const { dispatch } = useSidebarStateValue()
  const logState = useLogStateValue().state
  const logDispatch = useLogStateValue().dispatch
  const logStateRef = useRef(logState);
  const { onAppend, offAppend } = useSocketServiceValue()

  const onAppendHandler = (
    {stream, name, log}: IOnAppend,
    logDispatch: React.Dispatch<any>,
    logState: TLogMetadataHashed
  ) => {
    const key = buildLogKey(stream, name)
    const appendMessage = {[key]: [...logState[key], log]}
    logDispatch({type: 'setLogs', payload: appendMessage})
  }

  useEffect(() => {
    logStateRef.current = logState;
  });

  useEffect(() => {
    const handler = (socketParams: IOnAppend) =>
      onAppendHandler(socketParams, logDispatch, logStateRef.current)
    onAppend(handler);
    return () => {
      offAppend()
    }
  // eslint-disable-next-line
  }, []);

  const { configs } = useConfigurationServiceValue()

  const [openCollapse, setOpenCollapse] = React.useState(false)
  const [ selectedSubItem, setSelectedSubItem ] = React.useState('')

  const handleSelectedSubItem = (stream: string, name: string) => {
    dispatch({type: 'setSelectedStreamAndName', payload: buildLogKey(stream, name)})
    setSelectedSubItem(name)
  }

  function handleOpenSettings(){
    setOpenCollapse(!openCollapse);
  }

  function hasChildrenClicked (key: string) {
    return configs[key].some(subitems => subitems === selectedSubItem)
  }

  return(
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        {
          Object.keys(configs).map( key => (
            <List key={key}>
              <ListItem button onClick={handleOpenSettings} key={`${key}-listitem`}>
                <ListItemIcon>
                  {hasChildrenClicked(key) || openCollapse ? <FiberManualRecordSharpIcon style={{fill: 'green'}}/> : <FiberManualRecordOutlinedIcon/>}
                  
                </ListItemIcon>
                <ListItemText primary={key} />
                {openCollapse ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
              </ListItem>
              <Collapse key={`${key}-collapse`} in={openCollapse} timeout="auto" unmountOnExit>
                {
                  configs[key].map( name => (
                    <List key={`${name}-sublist`}>
                      <ListItem className={classes.sublistItem} button onClick={() => handleSelectedSubItem(key, name)}>
                        <ListItemIcon>
                          {selectedSubItem === name ?
                            <FiberManualRecordSharpIcon style={{fill: 'green'}}/> :
                            <FiberManualRecordOutlinedIcon/>
                          }
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItem>
                    </List>
                  ))
                }
              </Collapse>
            </List>
          ))
        }
      </Drawer>
    </div>
  )
}