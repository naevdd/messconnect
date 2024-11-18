import '../index.css'
import MessGalleryNav from './MessGalleryComp/MessGalleryNav'
import Scroller1 from './MessGalleryComp/Scroller1'
import ViewAll from './MessGalleryComp/ViewAll'

function MessGallery(){

    return(
        <div>

            <MessGalleryNav/>
            <div>
                <h1 className='mb-5 mt-10 text-left text-4xl ml-4'>Favourites</h1>
                <Scroller1/>

                <h1 className='mb-5 mt-20 text-left text-4xl ml-4'>Near You</h1>
                <Scroller1/>

                <ViewAll/>

            </div>
        
        </div>
    )

}

export default MessGallery