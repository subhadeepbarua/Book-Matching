import { useState } from 'react';
import './navbar.css'
import logo from '../icon/logo.png'
import Swal from 'sweetalert2';
const Navbar = () => {

  const [showAlert, setShowAlert] = useState(false);

  const handleClickLanguage = () => {
    setShowAlert(true);
      Swal.fire({
        html: "<div class='aboutText'> The Book Recommendation Web Application is developed using a modern tech stack, including React.js for the front end, MongoDB for the database, and Node.js with Express.js for the server-side logic. The application leverages advanced natural language processing techniques to enhance the recommendation engine.The system utilizes text embedding to extract meaningful representations from book summaries, enriching the dataset with embedded information. MongoDB Atlas Search is employed for efficient and powerful search capabilities, ensuring a seamless and responsive user experience.Upon user interaction, the application dynamically generates embeddings for user inputs, employing the Hugging Face API for enhanced natural language understanding. These embeddings are then utilized to query the MongoDB Atlas dataset, providing personalized and relevant book recommendations.By combining cutting-edge technologies, the Book Recommendation Web Application delivers a sophisticated and user-centric experience, offering tailored suggestions based on individual preferences and interests.</div>",

        width: '50rem',
        showCancelButton: true,  
        showConfirmButton: false
  
      });
    }

  return (
      <nav className="navbar">
        <div className='navbarItem logo'>
        <img className="navbarImg" src={logo} alt='logo'/>
        </div>
        <div className='navbarItem heading'>
        <h2 className="navbarHeading"> Book Matching </h2>
        </div>
        <div className='navbarItem lable'>
        <lable className="navbarLable" onClick={handleClickLanguage}> About </lable>
        </div>
    </nav>

  )
}

export default Navbar
