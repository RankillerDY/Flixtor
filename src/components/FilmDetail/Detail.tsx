import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


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

export default function Detail() {
    const baseURL = 'https://64953411b08e17c91791bb74.mockapi.io/Films'
    const [Film, setFilm] = useState<FilmObj | null>(null)
    const userName = useParams();
    // console.log(data.find((obj) => {
    //     return obj.id == userName.id;
    // }))



    const getFilm = () => {
        fetch(baseURL + '/' + userName.id, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        })
            .then((response) => {

                if (!response.ok) {
                    throw new Error(`Request fail with status ${response.status}`)
                } else {
                    return response.json()
                }
            })

            .then((data) => {
                setFilm(data)

            })

            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getFilm();
    }, [])

    // const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <div className='container-fluid '>
                <div className='container-inner'>
                    <div className='movie-full-info'>
                        <div className='movie-img'><img src={`../${Film?.Card_Img}`}></img></div>
                        <h5>{Film?.Title}</h5>
                        <div className='movie-categories'>
                            <small>HD</small> <small>R</small> <small>IMDb {Film?.Imbd}</small>
                        </div>
                        <div className='movie-details'>{Film?.details}</div>
                        <div className='meta'>
                            <div className='meta-component'>
                                <div>Type</div>
                                <div>Movie</div>
                            </div>
                            <div className='meta-component'>
                                <div>Country</div>
                                <div>{Film?.Nation}</div>
                            </div>
                            <div className='meta-component'>
                                <div>Release</div>
                                <div>{Film?.Release}</div>
                            </div>
                            <div className='meta-component'>
                                <div>Director</div>
                                <div>{Film?.Director}</div>
                            </div>
                            <div className='meta-component'>
                                <div>Production</div>
                                <div>Company Films</div>
                            </div>
                        </div>
                    </div>

                    <div className='movie-player'>
                        <div className='player'>
                            <div>
                                <iframe allowFullScreen src={Film?.clip} title={Film?.Title} style={{ border: "none" }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                            </div>
                            <div className='movies-control'>
                                <div className='movies-control-elements'><i className="fa-sharp fa-solid fa-square"></i> Auto Play</div>
                                <div className='movies-control-elements'><i className="fa-sharp fa-solid fa-square"></i> Auto Next</div>
                                <div className='movies-control-elements'><i className="fa-sharp fa-solid fa-square"></i> Auto Skip</div>
                                <div className='movies-control-elements'><i className="fa-sharp fa-solid fa-lightbulb"></i> Light</div>
                                <div className='movies-control-elements'><i className="fa-solid fa-bookmark"></i> Save</div>
                                <div className='movies-control-elements'><i className="fa-solid fa-flag"></i> Report</div>
                            </div>
                            <div className='movies-clouds'>
                                <div>If current server doesn't work please try other servers below.</div>
                                <div className='clouds-option'>
                                    <a className='cloud-elemets' href='#'>
                                        <div className='clouds-detail'>
                                            <span><i className="fa-solid fa-cloud"></i> Server</span>
                                            <span>Vidstream</span>
                                        </div>
                                    </a>
                                    <a className='cloud-elemets' href='#'>
                                        <div className='clouds-detail'>
                                            <span><i className="fa-solid fa-cloud" ></i> Server</span>
                                            <span>MyCloud</span>
                                        </div>
                                    </a>
                                    <a className='cloud-elemets' href='#'>
                                        <div className='clouds-detail'>
                                            <span><i className="fa-solid fa-cloud"></i> Server</span>
                                            <span>Filemoon</span>
                                        </div>
                                    </a>
                                    <a className='cloud-elemets' href='#'>
                                        <div className='clouds-detail'>
                                            <span><i className="fa-solid fa-cloud"></i> Server</span>
                                            <span>StreanFy</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
