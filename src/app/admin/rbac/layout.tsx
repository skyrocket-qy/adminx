
import { UserAvatarMenu } from '@/app/admin/header';
import { Button } from "@/components/ui/button"
// import  CheckBox  from "./check";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (

      <div className='w-full h-full'>
        <div className='w-full h-10 flex ml-4 mt-3'>
            {/* <div>
                <Button className='mr-2  bg-violet-500 w-20'>Data</Button>
                <Button className='mr-2  bg-emerald-500 w-20'>Tree</Button>
                <Button className=' bg-amber-500 w-20'>Graph</Button>
            </div> */}
            {/* <div className='ml-2'>
                <CheckBox />
            </div> */}
            <div className='ml-auto mr-3'>
                <UserAvatarMenu />
            </div>
        </div>
        <div className=" mt-3 ml-4 mr-4 mb-4 h-[91%] rounded-2xl ">
          <div className="bg-white rounded-2xl shadow-lg p-4 h-full">
            {children}
          </div>
        </div>
      </div>
  );
}
