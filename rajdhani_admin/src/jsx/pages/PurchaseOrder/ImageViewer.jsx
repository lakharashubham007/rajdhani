import Lightbox from "react-image-lightbox";
import 'react-image-lightbox/style.css';


const ImageViewer=({isOpen, images, currentImageIndex, setIsOpen, setCurrentImageIndex,setContentModal})=>{
    return(<>
    {isOpen && images?.length > 0 && images[currentImageIndex] && (
        <Lightbox
          mainSrc={images[currentImageIndex]}
          nextSrc={images[(currentImageIndex + 1) % images.length]}
          prevSrc={images[(currentImageIndex + images.length - 1) % images.length]}
          onCloseRequest={() => {setIsOpen(false); setContentModal(true)}}
          onMovePrevRequest={() =>
           setCurrentImageIndex((currentImageIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
           setCurrentImageIndex((currentImageIndex + 1) % images.length)
          }
        />
      )}
    </>)
} 

export default ImageViewer;