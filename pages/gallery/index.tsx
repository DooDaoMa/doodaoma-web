import Image from 'next/image'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { RouteGuard } from '../../components/organisms/RouteGuard'
import { fetchMyImages, gallerySelector } from '../../store/features/gallery'
import { currentUserSelector } from '../../store/features/user'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export default function Images() {
  const dispatch = useAppDispatch()
  const currentUser = useAppSelector(currentUserSelector)
  const { images, fetchMyImagesState } = useAppSelector(gallerySelector)

  useEffect(() => {
    if (currentUser === null) {
      return
    }
    dispatch(fetchMyImages(currentUser.id))
  }, [currentUser])

  useEffect(() => {
    if (fetchMyImagesState.error) {
      toast.error('Fetch images failed')
    }
  }, [fetchMyImagesState])

  return (
    <RouteGuard>
      <h1 className="text-3xl font-bold">Your Gallery</h1>
      <div className="flex flex-row">
        {images.length > 0 &&
          images.map((image) => (
            <div key={image.id}>
              <Image
                src={image.imageUrl}
                width={400}
                height={400}
                alt={image.name}
              />
            </div>
          ))}
      </div>
    </RouteGuard>
  )
}
