// import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className={`h-full w-full font-medium text-cyan-950
        flex flex-row`} 
      >
        <div className='mr-12 ml-8 flex items-center'>
            <img src='/head.png' className="size-12" />
        </div>
        <div className="flex items-center h-full text-xl ml-8 mr-8 text-center">
            Fontech
        </div>
        <div className='flex items-center  text-xl mr-8'>Senior backend engineer</div>
        <div className='flex items-center text-sm mr-8'>5~6 total experience</div>
        <div className='flex items-center text-sm ml-auto'>last updated: 20240417</div>
      </header>
  );
}