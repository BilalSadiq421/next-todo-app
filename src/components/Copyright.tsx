import * as React from "react";
import Typography from "@mui/material/Typography";

export default function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright ©  Next Todo App "}
      {new Date().getFullYear()}.
    </Typography>
  );
}
