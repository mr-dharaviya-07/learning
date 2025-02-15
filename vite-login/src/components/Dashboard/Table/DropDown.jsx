/* eslint-disable react/prop-types */
import { Autocomplete, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useEffect, useState } from "react";

export const DropDown = ({ field, form, options, multiple, placeholder, error, touched }) => {

    const { values , initialValues } = useFormikContext();

    const [value, setValue] = useState(initialValues[field.name]);

    useEffect(() => {
        if (initialValues[field.name]) {
            setValue(initialValues[field.name]);
        }
    }, [initialValues, field.name]);

    return (
        <Autocomplete
            sx={{
                display: 'inline-block',
                color: "black",

                '& input': {
                    height: 6,
                    color: "black",
                },
                '& .MuiSvgIcon-root': {
                    color: "black",
                },
                '& .MuiInputBase-root': {
                    border: "0px solid black",

                },
            }}
            slots={{

                '&.MuiAutocomplete-input': {
                    color: "blue",
                }
            }}
            multiple={multiple}
            id={`select-${field.name}`}
            options={options}
            value={value}
            getOptionDisabled={(option) => option === values.author}
            onChange={(event, value) => {
                form.setFieldValue(field.name, value == null ? "" : value);
                setValue(value)
            }}
            renderInput={(params) => (

                <TextField {...params}
                
                error={!!(error && touched)} 
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: error && touched ? "red" : "gray"
                        },
                    },
                }}
                placeholder={placeholder} />
            )}
        />
    );
};

