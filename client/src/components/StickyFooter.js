import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    color: "white",
    backgroundColor: "#014a72"
  },
  footerIcons: {
    padding: "0 8px",
    height: "32px"
  },
  contact: {
    paddingBottom: "16px"
  },
  links: {
    color: "white",
    textDecorationLine: "none"
  },
  iconsContainer: {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "16px"
  },
  copyright: {
    color: "white"
  },
  copyrightLink: {
    color: "yellow"
  }
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Grid container className={classes.contact}>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12} className={classes.iconsContainer}>              
                <img className={classes.footerIcons} src={"assets/images/f_logo_RGB-Blue_58.png"} alt="facebook"></img>
                <img className={classes.footerIcons} src={"assets/images/Twitter_Social_Icon_Circle_Color.png"} alt="twitter"></img>
                <img className={classes.footerIcons} src={"assets/images/instagram.png"} alt="instagram"></img>
                <img className={classes.footerIcons} src={"assets/images/youtube_social_icon_red.png"} alt="youtube"></img>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid item xs={12}>
                <a className={classes.links} href="mailto:varsphilos@gmail.com">info@tomfoolery.com</a>              
              </Grid>
              <Grid item xs={12}>
                <a className={classes.links} href="tel:8042409121">(866) 366-5379</a>
              </Grid>
            </Grid>
          </Grid>
          <Typography variant="body2" className={classes.copyright}>
            {'Copyright © '}
            <Link className={classes.copyrightLink} href="https://tom-foolery-entertainment.herokuapp.com/">
              Tom Foolery Entertainment
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </Container>
      </footer>
  );
}