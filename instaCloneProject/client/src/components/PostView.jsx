import insta from '../asset/icon.svg';
import camera from '../asset/camera.png';
import '../styles/PostView.css';
// import Card from "./Card.jsx";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";
// Below imports are for Card component
import heart from "../asset/heart.png";
import share from "../asset/share.png";
import dot from "../asset/dot.svg";
import '../styles/Card.css';


function Card(props) {
    // for changing like property
    const [like, setLike] = useState(props.user.likes);
    const [backColor, setBackColor] = useState({ backgroundColor: props.user.backgroundColor })

    // for update the post hook
    const [updatePost, setUpdatePost] = useState(props.user);

    const likeHandler = (e, id) => {
        // console.log(count, 'count');
        // console.log(like, 'like');
        // console.log(id);
        console.log(props.user.backgroundColor === "white")
        if (props.user.backgroundColor === "white") {
            setLike(like + 1);
            setBackColor({ backgroundColor: 'red' });
            // update like, count and buttonBackgrond color here
            updatePost.backgroundColor = 'red';
            updatePost.likes = updatePost.likes + 1;
            // console.log('update Post', updatePost);
            setUpdatePost(updatePost);
            // sending to backend
            Axios.patch(`http://localhost:5000/PostView/${id}`, updatePost)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            // .catch((error) => console.log(error))
        } else {
            setLike(like - 1);
            setBackColor({ backgroundColor: "white" });
            // update like, count and buttonBackgrond color here
            updatePost.backgroundColor = 'white';
            updatePost.likes = updatePost.likes - 1;
            // console.log(updatePost);
            setUpdatePost(updatePost);
            // sending to backend
            Axios.patch(`http://localhost:5000/PostView/${id}`, updatePost)
            .then((res) => {
                console.log(res.data);
                window.location.reload();
            })
            // .catch((error) => console.log(error))
        }

    }
    // delete post

    const deletePostHandler = (e, id) => {
        console.log(id);
        Axios.delete(`http://localhost:5000/PostView/${id}`)
            .then(res => console.log(res.data))
        // .catch(error => console.log(error));
        window.location.reload();
    }
    return (
        <div className="card">
            <div className="topSection">
                <div className="nameNlocation">
                    <p className="name">{props.user.name}</p>
                    <p className="location">{props.user.location}</p>

                </div>
                <img src={dot} alt='dot' className="dotPic" />
            </div>
            <div className='CardpicContainer'>
                {(props.user.PostImage['url']) ? (
                    <>
                        <img alt="cardPic" src={props.user.PostImage['url']} className="cardPic" />
                    </>
                ) : (
                    <>
                    <img alt="cardPic" src='/' className="cardPic" />
                        </>
                    )}

            </div>

            <div className="buttonSection">
                <div className="likeNshare">
                    <button className="heart" onClick={(e) => { likeHandler(e, props.user._id) }} style={backColor}><img src={heart} alt='heartPic' className='heartPic' /></button>
                    <button className="share"><img src={share} alt="sharePic" /></button>
                </div>
                <p className="date">{props.user.date}</p>
            </div>
            <div className="likes">
                {like}
            </div>
            <div className='bottomSection'>
                <p className="description">
                    {props.user.description}
                </p>
                <button className='deletePost' onClick={(e) => { deletePostHandler(e, props.user._id) }}>Delete</button>
            </div>

        </div>
    );
}


export default function PostView() {
    const [data, setData] = useState([]); //useState(Postsdata);

    useEffect(() => {
        console.log('useEffects is working');
        loadData()
    }, [])

    const loadData = () => {
        Axios.get('http://localhost:5000/PostView').then((res) => {
            // console.log(res.data);
            setData(res.data)
        })
        // setData(data)
    }
    return (
        <>
            <hr />
            <div className="header">
                <img src={insta} alt="instaClone" className="instaClone" />
                <h1>Instaclone</h1>
                <Link to='/upload'>
                    <img src={camera} alt="logo" className="camera" />
                </Link>
            </div>
            <hr />
            {data.map((user, index) => {
                return (
                    <Card key={index} user={user} />
                )
            })}
        </>
    );
}
