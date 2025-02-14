/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import { useDelete } from "../../../hooks/useDelete";
import { Response } from "../../response";
import { useState } from "react";


export const DeleteForm = ({ open, setOpen, onDelete, deleteData, value }) => {

    const [alert, setAlert] = useState(false);
    let id;

    deleteData?.book_id ?  id = deleteData?.book_id : id = deleteData?.author_id

    const responseData = useDelete(`http://localhost:4000/delete-${value}`, id);

    const handleClose = () => setOpen(false);

    const showAlert = async () => {
        setAlert(true);

        setTimeout(() => {
            setAlert(false)
        }, 2200)
    }


    const handleDelete = async () => {
        await responseData.mutateAsync();
        onDelete();
        showAlert();
        setOpen(false);
    }
    return (
        <>
            {responseData?.isError && <Response value={{ text: responseData.error.message, response: "error" }} alert={alert} />}
            {responseData?.isSuccess && <Response value={{ text: responseData.data.success, response: "" }} alert={alert} />}

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-paper": {
                        borderRadius: "12px",
                        padding: "16px",
                    },

                }}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description" sx={{ fontSize: "16px", textAlign: "center", color: "gray" }}>
                        Are you sure you want to delete this {value}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "center", paddingBottom: "16px" }}>
                    <Button variant="outlined" color="primary" onClick={handleClose} sx={{ borderRadius: "8px", textTransform: "none" }}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="error" onClick={handleDelete} sx={{ borderRadius: "8px", textTransform: "none" }}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
