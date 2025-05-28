import { Button } from '@fancy-shop/ui-components';

export function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Welcome to Fancy Shop</h1>
      <Button type="button" size={'sm'} className="mt-2">
        Click Me
      </Button>
    </div>
  );
}

export default HomePage;
