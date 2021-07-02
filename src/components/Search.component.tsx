import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { useSearchStyle } from "../styles/search.style";

export function SearchComponent() {
  const classes = useSearchStyle();

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Procure um produto"
        inputProps={{ "aria-label": "procure um produto" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchComponent;
