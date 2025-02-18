/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Autocomplete, Box, Button, createFilterOptions, TextField, Typography } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { AuthorForm } from "./Author/AuthorForm";
import { useGetAll } from "../../../hooks/useGetAll";

const filter = createFilterOptions();

export const DropDownAuthor = ({ field, form, multiple, error, touched }) => {

    const { values , initialValues } = useFormikContext();

    const author = useGetAll('http://localhost:4000/authores');

    const authorData = author?.data || [];

    const authorName = {
        options: authorData.map((option) => option.name),
    };


    const [authorDialogOpen, setAuthorDialogOpen] = useState(false);
    const [value, setValue] = useState(initialValues[field.name]);
    const [newAuthorName, setNewAuthorName] = useState("");

    useEffect(() => {
        if (field.name === "author_id") {
            authorData.forEach((option) => {
                if (option.name === values.author) {
                    form.setFieldValue(field.name, option.author_id);
                }
            });
        }
    }, [values.author, authorData]);

    useEffect(() => {
        setValue(initialValues[field.name]);
    }, [initialValues, field.name]);
    return (
        <>
            <Autocomplete
                {...authorName}
                sx={{
                    display: 'inline-block',
                    color: "black",
                    '& input': { height: 6, color: "black" },
                    '& .MuiSvgIcon-root': { color: "black" }
                }}
                multiple={multiple}
                value={value}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    if (params.inputValue.trim() !== "" && !options.includes(params.inputValue)) {
                        filtered.push("No Option");
                    }
                    return filtered;
                }}
                onChange={(event, value) => {
                    setValue(value)
                    form.setFieldValue(field.name, value == null ? "" : value);
                }}

                renderOption={(props, option, { inputValue }) => (
                    <li {...props} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                        {option === "No Option" ? (
                            <>
                                <Button
                                    fullWidth
                                    size="medium"
                                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", textTransform: "none" }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        console.log("Helo...")
                                        setNewAuthorName(inputValue);
                                        setAuthorDialogOpen(true);
                                    }}>

                                    <Typography sx={{ color: "gray" }}>No option found</Typography>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        sx={{ textTransform: "none" }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setNewAuthorName(inputValue);
                                            setAuthorDialogOpen(true);
                                        }}
                                    >
                                        Add Author
                                    </Button>
                                </Button>
                            </>
                        ) : (
                            option
                        )}
                    </li>
                )}

                renderInput={(params) => (
                    <TextField {...params}
                        sx={{

                            "& .MuiOutlinedInput-root": {
                                "& fieldset": { borderColor: error && touched ? "red" : "gray" },
                            },
                        }}
                        placeholder="Select or add an author" />
                )}
            />

            <AuthorForm
                initialName={newAuthorName}
                open={authorDialogOpen}
                setOpen={setAuthorDialogOpen}
                refetch={author.refetch}
            />

        </>
    );
};
