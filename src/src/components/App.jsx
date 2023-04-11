// import { Component } from 'react';
import  Notiflix  from 'notiflix';

import  Searchbar from './Searchbar/Searchbar';

import { Loader } from './Loader/Loader';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { galleryApi } from 'services/gallery-api';
import { useState } from 'react';

// import css from './app-module.css';

const App = () => {

  const [searchText, setSearchText] = useState('')
  const [page, setPage] = useState('1')
  const [img, setImg] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [buttonTogle, setButtonTogle] = useState(false)
  const [data, setData] = useState(null)
  const [isModal, setIsModal] = useState(false)
  const [currenPreview, setCurrenPreview] = useState(null)
  const [totalImage, setTotalImage] = useState('0');
  


  componentDidUpdate(_, prevState) {
    if (
      prevState.searchText !== this.state.searchText ||
      this.state.page !== prevState.page
    ) {
     setIsLoading( true);

      galleryApi(searchText, page)
        .then(response => response.json())
        .then(data => {
          if (!data.total) {
            Notiflix.Notify.failure(
              'Sorry, but nothing was found for your search'
            );
          }

          const hits = data.hits;
          this.buttonTogle(hits.length);
          
          
          this.setState(prevState => ({
            img: [...prevState.img , ...data.hits ],
            totalImage:data.total,
          }));

          console.log(this.state.img);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  const openModal = url => {
    setCurrenPreview(url)
    setIsModal(true)
  };

  const modalClose = () => {
    setIsModal(false)
  };


  const onLoadMore = () => {
    setPage(prevState => 
      prevState + 1,
    );
  };

 const buttonTogle = length => {
    if (length >= 12) {
      return setButtonTogle( true );
    }
    return setButtonTogle( false );
  };

 const  handleSearch = searchText => {
    this.setState({ searchText, img:[], page:1 });
  };
  
    return (
      <>
        <Searchbar handleSearch={handleSearch} />
       
        {img.length !== 0 && (<ImageGallery data={img} onImageClick={openModal} />)}
        
        {isLoading && <Loader />}
        {img.length !== totalImage && buttonTogle && !isLoading && <Button onClick={onLoadMore} />}
        { isModal && (
        <Modal onModalClose={modalClose}  image={currenPreview}/>
        )}
    </>
    )
}
export default App;

// export class App extends Component {
//   state = {
//     searchText: '',
//     page: 1,
//     img: [],
//     isLoading: false,
//     buttonTogle: false,
//     data: null,
//     isModal: false,
//     currenPreview: null,
//     totalImage : 0,
//   };

//   componentDidUpdate(_, prevState) {
//     if (
//       prevState.searchText !== this.state.searchText ||
//       this.state.page !== prevState.page
//     ) {
//       this.setState({ isLoading: true});

//       galleryApi(this.state.searchText, this.state.page)
//         .then(response => response.json())
//         .then(data => {
//           if (!data.total) {
//             Notiflix.Notify.failure(
//               'Sorry, but nothing was found for your search'
//             );
//           }

//           const hits = data.hits;
//           this.buttonTogle(hits.length);
          
          
//           this.setState(prevState => ({
//             img: [...prevState.img , ...data.hits ],
//             totalImage:data.total,
//           }));

//           console.log(this.state.img);
//         })
//         .catch(error => {
//           console.log(error);
//         })
//         .finally(() => {
//           this.setState({ isLoading: false });
//         });
//     }
//   }

//   openModal = url => {
//     this.setState({ currenPreview: url,
//     isModal:true,
//     });
//   };

// modalClose = () => {
//   this.setState({isModal:false})
// }


//   onLoadMore = () => {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   };

//   buttonTogle = length => {
//     if (length >= 12) {
//       return this.setState({ buttonTogle: true });
//     }
//     return this.setState({ buttonTogle: false });
//   };

//   handleSearch = searchText => {
//     this.setState({ searchText, img:[], page:1 });
//   };

//   render() {
//     const { handleSearch } = this;
//     const { isLoading, buttonTogle,isModal,currenPreview,img,totalImage } = this.state;
//     return (
//       <>
//         <Searchbar handleSearch={handleSearch} />
       
//         {img.length !== 0 && (<ImageGallery data={img} onImageClick={this.openModal} />)}
        
//         {isLoading && <Loader />}
//         {img.length !== totalImage && buttonTogle && !isLoading && <Button onClick={this.onLoadMore} />}
//         { isModal && (
//         <Modal onModalClose={this.modalClose}  image={currenPreview}/>
//         )}
//       </>
//     );
//   }
// }