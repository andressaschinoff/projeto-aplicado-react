import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

interface Props {
  fairName: string;
  subtotal: string;
  delivery: string;
  total: string;
}

export default function Troller(props: Props) {
  const { fairName, delivery, subtotal, total } = props;

  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <Box>
      <Box className="fair">
        <Typography color="textPrimary" variant="body2">
          Pedido feito em
        </Typography>
        <Typography> {fairName}</Typography>
        <Typography>
          <Link
            href="#"
            onClick={preventDefault}
            color="secondary"
            variant="body1"
          >
            Ver mais
          </Link>
        </Typography>
      </Box>
      <Box className="items"></Box>
      <Box className="total">
        <Box>
          <Typography>Subtotal</Typography>
          <Typography>{subtotal}</Typography>
        </Box>
        <Box>
          <Typography>Taxa de entrega</Typography>
          <Typography>{delivery}</Typography>
        </Box>
        <Box>
          <Typography>Total</Typography>
          <Typography>{total}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
