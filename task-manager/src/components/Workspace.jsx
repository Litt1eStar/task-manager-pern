import { Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import Container_Item from "./Workspace/Container_Item";
import Cookies from "js-cookie";

export default function Workspace() {
  const [form, setForm] = useState("");
  const [data, setData] = useState([]);
  const handleClick = async () => {
    try {
      const res = await fetch(`/api/container/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: form }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(`Send Api to Server`);
        getDataFromDatabase();
        setForm("");
      }
    } catch (error) {}
  };

  const getDataFromDatabase = async () => {
    try {
      const res = await fetch("/api/container/getAllContainer");

      const data = await res.json();

      if (res.ok) {
        setData(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getDataFromDatabase();
    console.log(data);
  }, []);
  return (
    <Box
      border="2px solid black"
      width="95%"
      height="100vh"
      mx="auto"
      pl="20px"
      pt="20px"
    >
      <Stack width="100%" height="100%" direction="row" gap="30px">
        <Stack width="25%" gap="15px">
          <TextField
            label="Container Name"
            value={form}
            onChange={(e) => setForm(e.target.value)}
          />
          <Button
            variant="outlined"
            sx={{ width: "10%", mx: "auto" }}
            onClick={handleClick}
          >
            Add
          </Button>
        </Stack>

        {/* Container */}
        <Stack width="70%" height="100%" direction="column" overflow='auto' gap='20px'>
          {data.map((container) => (
            <Container_Item
              key={container.id}
              name={container.name}
              status={container.status}
              date="13-05-2005"
              id={container.id}
              fetchMethod={getDataFromDatabase}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
