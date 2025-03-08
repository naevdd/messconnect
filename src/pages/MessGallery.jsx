import '../index.css'
import MessGalleryNav from '../Components/MessGalleryComp/MessGalleryNav'
import Scroller1 from '../Components/MessGalleryComp/Scroller1'
import ViewAll from '../Components/MessGalleryComp/ViewAll'

function MessGallery(){

    return(
        <div>

            <MessGalleryNav/>
            <div>
                <h1 className='mb-5 mt-10 text-left text-4xl ml-4'>Favourites</h1>
                <Scroller1/>

                <ViewAll/>

            </div>
        
        </div>
    )

}

export default MessGallery