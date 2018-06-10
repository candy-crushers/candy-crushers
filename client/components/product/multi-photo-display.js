import React from 'react'

function MultiPhotoDisplay (props) {
  const { photos, selected, changeSelected } = props
  return (
    <div className="multiPhoto">
      <img className="largePhoto" src={selected} />
      <div className="photoBar" >
        {
          photos.map((photo, index) => {
            if(index !== selected){
              return <img key={photo.id} src={photo} className="smallPhoto" onClick={changeSelected} />
            }else{
              return (<span />)
            }
          })
        }
      </div>
    </div>)
}

export default MultiPhotoDisplay
