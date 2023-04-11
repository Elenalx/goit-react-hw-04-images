import { useEffect } from 'react';
import css from './modal.module.css';
import PropTypes from 'prop-types';



const Modal = ({ onModalClose, img }) => {
  
  useEffect(() => {

    const keyClose = e => {
      if (e.code === 'Escape') {
        onModalClose();
      }
    }
    

    window.addEventListener('keydown', keyClose);
    return () => {
      window.addEventListener('keydown', keyClose);
    };
    
  }, [onModalClose]);

 const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }

    return (
      <div className={css.overlay} onClick={handleBackDropClick}>
        <div className={css.modal}>
          <img src={img} alt="" />
        </div>
       </div>
     );
  }
  
}

Modal.propTypes = {
  img: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
};
// export class Modal extends Component {
//   componentDidMount() {
//     
//   }

//   componentWillUnmount() {
//    
//   }

//   

//  
//   };

//   render() {
//     return (
//       
//   }
// }

// Modal.propTypes = {
//   image: PropTypes.string.isRequired,
//   onModalClose: PropTypes.func.isRequired,
// };
export default Modal
