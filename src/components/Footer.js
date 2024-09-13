import { lazy, Suspense } from 'react';

const SocialLinks  = lazy(() => import("./SocialLinks"))

export default function Footer() {
  return (
    <>
    <footer className='footer text-center pb-1'>
        <Suspense fallback={<></>}>
          <SocialLinks />
        </Suspense>
<small>&copy; 2024 Ajay Robin. All rights reserved.</small>
      </footer>
    </>
  );
}