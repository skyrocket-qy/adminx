import "./globals.css";
import Header from '@/app/components/header';
import LinkBar from '@/app/components/LinkBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full ">
      <body className="h-full overflow-hidden">
        <div className="h-7 bg-red-400 ">
          <Header />
        </div>
        <div className="flex h-full bg-pink-100">
          <main className="flex-1 overflow-hidden h-full">
            {children}
          </main>
          <div className="w-12 h-full overflow-y-auto bg-yellow-400">
            <LinkBar />
          </div>
        </div>
      </body>
    </html>
  );
}
