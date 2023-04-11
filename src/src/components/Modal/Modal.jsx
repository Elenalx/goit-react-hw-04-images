import { useEffect } from 'react';
import css from './modal.module.css';



const Modal = ({ onModalClose,image }) => {
  
  useEffect(() => {

      const keyClose = e => {
    if (e.code === 'Escape') {
      onModalClose();
    }
      }
    
    window.addEventListener('keydown', keyClose);
      


  
},[onModalClose])

  handleBackDropClick = e => {
    if (e.target === e.currentTarget) {
      onModalClose();
    }

    return (
      <div className={css.overlay} onClick={this.handleBackDropClick}>
        <div className={css.modal}>
          <img src={image} alt="" />
        </div>
       </div>
     );
    
  }
  
}
// export class Modal extends Component {
//   componentDidMount() {
//     
//   }

//   componentWillUnmount() {
//     window.addEventListener('keydown', this.keyClose);
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
