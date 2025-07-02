import React, { useState, useEffect } from "react";
import {
  Modal,
  Fade,
  Backdrop,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Checkbox
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxIconxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { lightGreen } from "@mui/material/colors";

const CustomModalQues = ({ open, handleClose, content, id }) => {
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedPubIds, setSelectedPubIds] = useState([]);
  const [data, setData] = useState(null);

  const pubid = id;

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    console.log(selectedPubIds)

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/setref/",
        {
          publication_id: pubid,
          cited_publications_id: selectedPubIds
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${token}`,
          },
        }
      );
      console.log("Data sent successfully:", response.data);
      toast.success("IDs sent successfully!");
      
    } catch (error) {
      console.error("Error sending data:", error);
      toast.error("Error sending data.");
    }
  };

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. Please log in.");
      return;
    }
    fetch("http://127.0.0.1:8000/api/listpub/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const icon = <CheckBoxIconxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handlePublicationSelection = (event, newValue) => {
    if (newValue) {
      const selectedIds = newValue.map((pub) => pub.id);
      setSelectedPubIds(selectedIds);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          onSubmit={handleSubmit}
          method="post"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: 800,
            maxHeight: 800,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" component="h2">
            Add Reference
          </Typography>
          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            A reference in research typically refers to a citation or mention of
            a research paper in another academic document. It strengthens the
            credibility and impact of a study by demonstrating that it is
            acknowledged and utilized by other researchers in the field.
          </Typography>

          <Autocomplete
            multiple
            options={data || []}
            disableCloseOnSelect
            getOptionLabel={(option) => `${option.titre}`}
            isOptionEqualToValue={(option, value) =>
              option.titre === value.titre
            }
            onChange={handlePublicationSelection}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {`${option.titre}`}
              </li>
            )}
            style={{ width: 650 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Publications"
                placeholder="Add Publication"
                required
                color="secondary"
                variant="outlined"
                margin="normal"
              />
            )}
          />

          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 2 }}
            justifyContent="space-between"
            marginTop={100}
          >
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={handleSubmit}
              >
                Add
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                size="small"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
          
          <ToastContainer /> 
        </Box>
      </Fade>
      
    </Modal>
  );
};

export default CustomModalQues;
