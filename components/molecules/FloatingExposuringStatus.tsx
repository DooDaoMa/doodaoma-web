type Props = {
  isShow: boolean
  onClick: () => void
}

export const FloatingExposuringStatus = ({ isShow, onClick }: Props) => {
  return (
    <>
      {isShow && (
        <div
          onClick={onClick}
          className="fixed bottom-4 left-4 cursor-pointer rounded-md border bg-white py-3 px-8">
          <p>Imaging is running...</p>
        </div>
      )}
    </>
  )
}
