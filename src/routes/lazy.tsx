/* eslint-disable @typescript-eslint/no-explicit-any */


import { lazy, Suspense } from "react";

const LoadingSpinner = () => (
  <div className="spinner">
    <div className="spinner-inner"></div>
  </div>
);
export const lazyFnDelay = (importFunc: any) => {

  const LazyComponent = lazy(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(importFunc());
        }, 1000);
      });
    });
  //const LazyComponent = lazy(importFunc);

  return <Suspense fallback={<LoadingSpinner/>}>
    <LazyComponent />
  </Suspense>;
};   

export const lazyFnTrue = (importFunc: any) => {
  
    const LazyComponent = lazy(() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(importFunc());
          }, 1000);
        });
      });
    //const LazyComponent = lazy(importFunc);
  
    return <LazyComponent />;
  }

