import LensPic from '../asset/lens-1418954@2x.png';
import '../styles/LandingPage.css'; 
import { Link } from 'react-router-dom';

export default function LandingPage(){
    return (
        <div className='LandingPage'>
            <img src={LensPic} className='Lenspic' alt='LensPic'/>
            <div className='rightSection'>
                <h1>10x Team 04</h1>
                <Link to='/PostView' className='button'>Enter</Link>
            </div>
        </div>
    );
}