import { Button, Stack, Typography } from "@mui/material"
import {useNavigate} from 'react-router-dom'

export default function Container_Item({name, status, date, id, fetchMethod}) {
  const navigate = useNavigate();
    const handleDeleteItem = async() => {
        try {
            const res = await fetch(`/api/container/delete/${id}`, {
                method: "DELETE"
            })

            if(res.ok){
                console.log(`Successfully Delete Item`)
                fetchMethod()
            }
        } catch (error) {
            
        }
    }

    const handleClick = () => {
      navigate(`/container/${id}`)
    }
  return (
    <Stack width="100%" height="auto">
        <Stack
          width="95%"
          height="200px"
          border="2px solid gray"
          borderRadius="15px"
          pl="10px"
          pt="5px"
          direction="row"
        >
          <Stack width="50%" height="100%" onClick={handleClick}>
            <Stack gap="120px">
              <Typography variant="h4">{name}</Typography>
              <Typography>Status: {status.toString()}</Typography>
            </Stack>
          </Stack>

          <Stack width="50%" height="100%">
            <Stack gap="120px" alignItems="flex-end" pr="10px">
              <Typography variant="h4">Create At: {date}</Typography>
              <Button color="error" onClick={handleDeleteItem}>Delete</Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
  )
}
