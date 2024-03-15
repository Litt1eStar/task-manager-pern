import { Stack } from "@mui/material";
import Container_Item from "./Container_Item";

export default function Container() {
  return (
    <Stack width="70%" height="100%" direction="column">
      <Container_Item name='First Container' status={true} user='toreinortin' date='13-05-2005'/>
    </Stack>
  );
}
