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
      <h1 className="mb-6 text-3xl font-bold">Your Gallery</h1>
      <div className="grid grid-cols-5 gap-12">
        {images.length > 0 &&
          images.map((image) => (
            <div className="relative h-48 rounded-md" key={image.id}>
              <Image
                className="overflow-hidden object-cover"
                src={image.imageUrl}
                alt={image.name}
                priority
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
              />
            </div>
          ))}
      </div>
    </RouteGuard>
  )
}
