import LoginForm from './login-form';

export default function LoginPage() {
  return (
    <
      main className="flex items-center justify-center h-full"
      style={{ backgroundImage: "url('/auth_bg.png')" }}
    >
      <div className="absolute right-20 mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* <div className="flex w-full h-full rounded-lg bg-neutral-900 p-3">
          <div className="w-full h-full text-white">
            <Logo />
          </div>
        </div> */}
          <LoginForm />
      </div>
    </main>
  );
}