/* eslint-disable @typescript-eslint/no-explicit-any */


import { lazy, Suspense } from "react";


export const lazyFnDelay = (importFunc: any) => {

  const LazyComponent = lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFunc());
        }, 1000);
      });
    });
  //const LazyComponent = lazy(importFunc);

  return <Suspense fallback={<>Loading ....</>}>
    <LazyComponent />
  </Suspense>;
};    
