import Image from 'next/image'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { Button } from '../../components'
import { fetchMyImages, gallerySelector } from '../../store/features/gallery'
import { currentUserSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function Gallery() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(currentUserSelector)
  const { images, fetchMyImagesState } = useAppSelector(gallerySelector)

  useEffect(() => {
    if (currentUser === null) {
      return
    }
    if (images.length > 0) {
      return
    }
    dispatch(fetchMyImages(undefined))
  }, [currentUser, images])

  useEffect(() => {
    if (fetchMyImagesState.error) {
      toast.error('Fetch images failed')
    }
  }, [fetchMyImagesState])

  return (
    <>
      <div className="mb-6 flex justify-between">
        <h1 className="text-3xl font-bold">Your Gallery</h1>
        <Button
          type="button"
          onClick={() => dispatch(fetchMyImages(undefined))}>
          Refresh
        </Button>
      </div>
      <div className="grid grid-cols-5 gap-12">
        {images.length > 0 &&
          images.map((image) => (
            <div
              className="relative h-48 overflow-hidden rounded-md lg:h-[320px]"
              key={image.id}>
              <Image
                className="object-cover"
                src={image.imageUrl}
                alt={image.name}
                priority
                fill
              />
            </div>
          ))}
      </div>
    </>
  )
}

Gallery.requireAuth = true
