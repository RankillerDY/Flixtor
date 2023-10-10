import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Typography, Modal, Box } from '@mui/material'

interface FilmObj {
    id: number;
    Image: string;
    Title: string;
    Year: string;
    Nation: string;
    Card_Img: string;
    Imbd: number;
    details: string;
    clip: string;
    Release: string;
    Director: string;
}



export default function Dashboard() {
    const [APIData, setAPIData] = useState<FilmObj[] | null>(null);
    const baseURL = 'https://64953411b08e17c91791bb74.mockapi.io/Film_list'
    const [open, setOpen] = useState(false);
    const [accept, setAccept] = useState(false);
    const [id, setID] = useState<number>(0);
    const handleClose = () => {
        setOpen(false);
    };

    const styleModal = {
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

    const ImageStyle = {
        width: '65px',
        height: '65px'
    }

    const ButtonStyle = {
        background: "none",
        color: "inherit",
        border: "none",
        padding: 0,
        font: "inherit",
        cursor: "pointer",
        outline: "inherit"
    }

    const IconStyle = {
        float: 'right',
        marginRight: '50px',
        transform: 'translateY(-50%)',
        padding: '5px 0px',
        backgroundColor: 'white',
        // border: '1px solid white'
    }



    const getFilm = () => {
        fetch(baseURL)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Request fail with status ${response.status}`)
                } else {
                    return response.json()
                }
            })

            .then((data) => {
                setAPIData(data)
            })

            .catch((error) => {
                console.log(error.message)
            })
    }
    useEffect(() => {
        getFilm();
    }, [])

    // useEffect(() => {

    // }, [accept])

    function onConfirm(id: number) {
        var option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
        fetch(baseURL + '/' + id, option)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP Status: ${response.status}`)
                } else {
                    response.json();
                }

            })
            .then(() => {
                getFilm();
            })
            .catch(error => console.log(error.message))



    }

    return (
        <div>
            <div className='DashBoard-container'>
                <Link to={`/Add`}>
                    <Button variant="outlined" href="#outlined-buttons" sx={IconStyle}>
                        <CreateIcon />
                    </Button>
                </Link>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="left">Title</TableCell>
                                <TableCell align="left">Card_Img</TableCell>
                                <TableCell align="left">Director</TableCell>
                                <TableCell align="left">Nation</TableCell>
                                <TableCell align="left">Release</TableCell>
                                <TableCell align="left">Year</TableCell>
                                <TableCell align="left">Imbd</TableCell>
                                <TableCell align="left">Delete</TableCell>
                                <TableCell align="left">Update</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {APIData?.map((film) => (
                                <TableRow
                                    key={film.Title}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="film">
                                        {film.id}
                                    </TableCell>
                                    <TableCell align="left">{film.Title}</TableCell>
                                    <TableCell align="left"><img src={film.Card_Img} style={ImageStyle}></img></TableCell>
                                    <TableCell align="left">{film.Director}</TableCell>
                                    <TableCell align="left">{film.Nation}</TableCell>
                                    <TableCell align="left">{film.Release}</TableCell>
                                    <TableCell align="left">{film.Year}</TableCell>
                                    <TableCell align="left">{film.Imbd}</TableCell>
                                    <TableCell align="left"><button style={ButtonStyle} onClick={() => { setOpen(true); setID(film.id) }}><DeleteIcon /></button></TableCell>
                                    <TableCell align="left"><Link to={`/Update/${film.id}`}><button style={ButtonStyle}><SyncAltIcon /></button></Link></TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Are you sure to delete?
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <Button variant="text" onClick={() => { onConfirm(id); handleClose(); }}>Yes</Button> <Button variant="text" onClick={() => { setAccept(false); handleClose(); }}>No</Button>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </div>

    )
}
