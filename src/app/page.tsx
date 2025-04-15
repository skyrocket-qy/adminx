// import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-full">
      <img
        src='home.png'
        alt="Home"
        // fill
        className="absolute inset-0 w-full h-full object-cover"
      />
    </div>
  );
}
