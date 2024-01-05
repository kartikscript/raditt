import SignUp from '@/components/SignUp'
import CloseModal from '@/components/CloseModal'

const page = () => {
  return (
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/6 bg-black/90 px-6 pt-4 pb-8 rounded-xl shadow-xl'>
      <CloseModal/>
      <SignUp/>
    </div>
  )
}

export default page