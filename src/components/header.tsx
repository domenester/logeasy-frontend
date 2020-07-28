import React from "react"
import { CssBaseline, AppBar, Toolbar, Typography, createStyles, makeStyles, Theme } from "@material-ui/core"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      width: `100%`
    }
  }),
);

export const Header = () => {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Logeasy
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  )
}