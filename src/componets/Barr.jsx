import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
function Barr() {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6" color="inherit" component="div">
          List Daily
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
export default Barr;
