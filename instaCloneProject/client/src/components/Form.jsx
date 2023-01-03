
import '../styles/Form.css';
import insta from '../asset/icon.svg';
import camera from '../asset/camera.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from "axios";


export default function Form() {
    // name and nameError
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    // location and locationError
    const [location, setLocation] = useState('');
    const [locationError, setLocationError] = useState('');
    // description and descriptionError
    const [description, setDescription] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    // file and fileError
    const [file, setFile] = useState('');
    const [fileError, setFileError] = useState('');
    // Form data
    const [formData, setFormData] = useState({});
    // Form submit confirmation hook
    const [message, setMessage] = useState('')
    //  useNavigate
    const navigate = useNavigate();

    // form Submit
    const submitHandler = (e) => {
        e.preventDefault();
        // setting form data

        setFormData({
            name: name,
            location: location,
            description: description,
            PostImage: file
        })
    }

    // UseEffects Hooks are here
    // For message
    useEffect(() => {
        if (name.length >= 3 && description.length > 0 && location.length > 0 && file.length > 0) {
            setMessage('You can submit your post')
        }
        if (name.length < 3 || description.length === 0 || location.length === 0 || file.length === 0) {
            setMessage('')
        }
    }, [name, description, location, file])
    // For file
    useEffect(() => {
        if (file.length === 0) {
            setFileError('* Your post can not be empty')
        } else {
            setFileError('');
        }
    }, [file])
    // For name
    useEffect(() => {
        if (name.length < 3) {
            setNameError('* Name should have min 3 alphabets');
        } else {
            setNameError('');
        }
    }, [name])
    // For description
    useEffect(() => {
        if (description.length === 0) {
            setDescriptionError('* Description can not be empty')
        } else {
            setDescriptionError('');
        }
    }, [description])
    // For location
    useEffect(() => {
        if (location.length === 0) {
            setLocationError('* Location can not be empty');
        } else {
            setLocationError('');
        }
    }, [location])
    // For posting data to server
    useEffect(() => {
        console.log(formData);
        Axios.post("http://localhost:5000/upload", formData)
            .then((res) => {
                console.log('post created succesfull', res.data);
                setMessage('Post submitted, please wait!');

                setTimeout(() => {
                    navigate('/PostView')
                },4000)
            })
            .catch((error) => { console.log(error) });
        }, [formData, navigate])

    // File upload

    const uploadHandler = (e) => {
        const pic = e.target.files[0];
        TransformFile(pic)
    }
    // covert file to base 64
    const TransformFile = (pic) => {
        const reader = new FileReader()
        if (pic) {
            reader.readAsDataURL(pic);
            reader.onloadend = () => {
                setFile(reader.result)
            };
        } else {
            setFile('')
        }
    }
    return (
        <div className="Form">
            <hr />
            <div className="header">
                <img src={insta} alt="instaClone" className="instaClone" />
                <h1>Instaclone</h1>

                <img src={camera} alt="logo" className="camera" />

            </div>
            <hr />
            <form className='form' method='post'>

                <label>Name</label>
                <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
                <p className='error'>{nameError}</p>
                <br />

                <label>Location</label>
                <input type='text' placeholder='Location' value={location} onChange={(e) => setLocation(e.target.value)} />
                <p className='error'>{locationError}</p>
                <br />

                <label>Description</label>
                <input type='text' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
                <p className='error'>{descriptionError}</p>
                <br />

                <label>Your Post</label>
                <input type='file' accept="image/" onChange={(e) => uploadHandler(e)} className='fileInput' />
                <p className='error'>{fileError}</p>
                <br />

                <button onClick={(e) => submitHandler(e)} className='submit'>Submit </button>
                {(message.length > 0) ? (
                    <p className='message'>{message}</p>
                ) : (
                    <p className='message'></p>
                )}
            </form>
            {file ? (
                <div className='ImageContainer'>
                    <h2>Your Post Image Preview</h2>
                    <img src={file} alt='Postpic' className='postImage' />
                </div>
            ) : (
                <p className='imagePara'>Image will appear here</p>
            )}
        </div>
    );
}