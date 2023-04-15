import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '../../components'
import { fetchImageById, removeImageById } from '../../store/features/gallery'
import { useAppDispatch } from '../../store/hooks'
import { IImage } from '../../types/gallery'

export default function ImageDetail() {
  const { query, push } = useRouter()
  const dispatch = useAppDispatch()
  const [imageDetail, setImageDetail] = useState<IImage>()

  useEffect(() => {
    ;(async () => {
      if (!query.imageId) return
      const response = await dispatch(fetchImageById(query.imageId))
      if (response.meta.requestStatus === 'fulfilled') {
        setImageDetail(response.payload as IImage)
      }
    })()
  }, [query, dispatch])

  const onRemove = async () => {
    if (imageDetail === undefined) return
    const response = await dispatch(removeImageById(imageDetail.id))
    if (response.meta.requestStatus === 'fulfilled') {
      push('/gallery')
      toast.success('Image removed')
    }
  }

  return (
    <>
      {imageDetail !== undefined && (
        <div>
          <h1 className="mb-2 text-3xl font-bold">{imageDetail.name}</h1>
          <p className="mb-2">Created at {imageDetail.createdAt}</p>
          <div className="mb-6 flex gap-2">
            <a href={imageDetail.imageUrl} download>
              <Button btnStyle="secondary">Download</Button>
            </a>
            <Button btnStyle="danger" onClick={onRemove}>
              Remove
            </Button>
          </div>
          <Image
            src={imageDetail.imageUrl}
            alt={`${imageDetail.name} gallery image`}
            width={800}
            height={600}
            className="rounded-2xl"
          />
        </div>
      )}
    </>
  )
}
