
export const handleSavedClick = async () => {
    const newSaveState = !save;
    setSave(newSaveState);
  
    const savedPublications = JSON.parse(localStorage.getItem("savedPublications")) || {};
    savedPublications[res.id] = newSaveState;
    localStorage.setItem("savedPublications", JSON.stringify(savedPublications));
  
    try {
      if (newSaveState) {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/savepub/`,
          {
            publication_id: res.id,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Publication saved successfully:", response.data);
        toast.success("Publication saved successfully!");
      } else {
        const response = await axios({
          method: "delete",
          url: `http://127.0.0.1:8000/api/unsavepub/`,
          data: {
            publication_id: res.id,
          },
          headers: {
            Authorization: `Token ${localStorage.getItem("token")}`,
          },
        });
        console.log("Publication unsaved successfully:", response.data);
        toast.info("Publication unsaved successfully!");
      }
    } catch (error) {
      console.error("Error handling save request:", error);
      toast.error("An error occurred while handling the save request.");
    }
  };


