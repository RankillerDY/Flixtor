import React, { useEffect, useState } from 'react'
import { FormControl, FormLabel, Paper, Input, Button, Typography, Modal, Box } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function Update() {
    const baseURL = 'https://64953411b08e17c91791bb74.mockapi.io/Film_list'
    const [open, setOpen] = useState(false);
    const [APIData, setAPIData] = useState({})
    const filmID = useParams();

    const getFilm = () => {
        fetch(baseURL + '/' + filmID.id)
            .then((response) => {

                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                } else {
                    return response.json()
                }
            })

            .then((data) => {
                setAPIData(data)
                //Set value to LocalStorage
                // sessionStorage.setItem('Title', APIData.Title)
                // sessionStorage.setItem('Image', APIData.Image)
                // sessionStorage.setItem('Director', APIData.Director)
                // sessionStorage.setItem('Nation', APIData.Nation)
                // sessionStorage.setItem('Release', APIData.Release)
                // sessionStorage.setItem('Imbd', APIData.Imbd)
                // sessionStorage.setItem('clip', APIData.clip)
                // sessionStorage.setItem('details', APIData.details)
                // sessionStorage.setItem('Card_Img', APIData.Card_Img)
                formik.setValues({
                    Title: data.Title || '',
                    Image: data.Image || '',
                    Director: data.Director || '',
                    Nation: data.Nation || '',
                    Release: data.Release || '',
                    Year: data.Year || '',
                    Imbd: data.Imbd || '',
                    clip: data.clip || '',
                    details: data.details || '',
                    Card_Img: data.Card_Img || ''
                })
            })

            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getFilm();
    }, [])

    const InputStyle = {
        padding: '0px 0px 0px',
        fontSize: "25px",
        width: "100%"
    }

    const style = {
        padding: "1rem 3rem",
        background: "white",
        maxWidth: 400,
        paddingTop: "2rem",
        borderRadius: 20,
        border: 0,
        boxShadow: "0 5px 30px 0 rgb(0 0 0 / 10 %)",

        margin: "-25px 0 0 - 25px",
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    }

    const handleClose = () => {
        setOpen(false);
    };



    const formik = useFormik({
        initialValues: {
            Title: '',
            Image: '',
            Director: '',
            Nation: '',
            Release: '',
            Year: '',
            Imbd: '',
            clip: '',
            details: '',
            Card_Img: ''
        },
        onSubmit: (values) => {
            var option = {
                method: 'PUT', // or PATCH
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(values)
            }
            fetch(baseURL + '/' + filmID.id, option)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error(`HTTP Status: ${response.status}`)
                    } else {
                        return response.json();
                    }
                })
                .then((data) => setOpen(true))
                .catch(error => console.log(error.message))
        },
        validationSchema: Yup.object({
            Title: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            Image: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            Director: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            Nation: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            Release: Yup.string().required('Required.').min(2, "Must be 2 characters or more").test('valid-date', 'Invalid format', function (value) {
                const regex = /^(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{1,2},\s\d{4}$/;
                return regex.test(value)

            }),
            Year: Yup.string().required('Required.').min(2, "Must be 2 characters or more").test('valid-date', 'Invalid format', function (value) {
                const regex = /^\d{4}$/
                return regex.test(value)
            }),
            Imbd: Yup.number().test('valid-double', 'Invalid number format', function (value) {
                // Regular expression to match a valid double number
                const regex = /^\d+(\.\d+)?$/;

                // Check if the value matches the regular expression
                return regex.test(String(value));
            }),
            clip: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            details: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
            Card_Img: Yup.string().required('Required.').min(2, "Must be 2 characters or more"),
        }),
    });



    return (
        <div>
            <div className='Add-form'>
                <form onSubmit={formik.handleSubmit}>
                    <h3 style={{ marginBottom: 20 }}>Update a film</h3>
                    <Paper variant="outlined" className="container" sx={{ marginBottom: 5, boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)' }} >
                        <div style={{ marginBottom: 40, marginTop: 20 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel >Title</FormLabel>

                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Title} name='Title' ></Input>

                                {formik.errors.Title && formik.touched.Title && (<Typography variant="caption" color="red">{formik.errors.Title}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Card Picture</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Image} name='Image' />
                                {formik.errors.Image && formik.touched.Image && (<Typography variant="caption" color="red">{formik.errors.Image}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Director</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Director} name='Director' />
                                {formik.errors.Director && formik.touched.Director && (<Typography variant="caption" color="red">{formik.errors.Director}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Nation</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Nation} name='Nation' />
                                {formik.errors.Nation && formik.touched.Nation && (<Typography variant="caption" color="red">{formik.errors.Nation}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Release</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Release} name='Release' placeholder='ex:January 12, 2012' />
                                {formik.errors.Release && formik.touched.Release && (<Typography variant="caption" color="red">{formik.errors.Release}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Year</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Year} name='Year' placeholder='ex:20xx' />
                                {formik.errors.Year && formik.touched.Year && (<Typography variant="caption" color="red">{formik.errors.Year}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Imbd</FormLabel>
                                <Input type='number' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Imbd} name='Imbd' />
                                {formik.errors.Imbd && formik.touched.Imbd && (<Typography variant="caption" color="red">{formik.errors.Imbd}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Clip URL</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.clip} name='clip' />
                                {formik.errors.clip && formik.touched.clip && (<Typography variant="caption" color="red">{formik.errors.clip}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 40 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Details</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.details} name='details' />
                                {formik.errors.details && formik.touched.details && (<Typography variant="caption" color="red">{formik.errors.details}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ marginBottom: 15 }}>
                            <FormControl sx={{ width: '100%' }}>
                                <FormLabel>Film Poster</FormLabel>
                                <Input type='text' sx={InputStyle} onChange={formik.handleChange} value={formik.values.Card_Img} name='Card_Img' />
                                {formik.errors.Card_Img && formik.touched.Card_Img && (<Typography variant="caption" color="red">{formik.errors.Card_Img}</Typography>)}
                            </FormControl>
                        </div>
                        <div style={{ textAlign: 'end' }}>
                            <Button variant="contained" type='submit' size="large">Update</Button>
                        </div>
                    </Paper>
                </form>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Updated Successful!!
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    </Typography>
                </Box>
            </Modal>
        </div>
    )

}
