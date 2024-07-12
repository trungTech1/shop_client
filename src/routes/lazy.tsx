/* eslint-disable @typescript-eslint/no-explicit-any */


import { lazy, Suspense } from "react";
import FallBack from "./FallBack";

const LoadingSpinner = () => (
  <div className="spinner">
    <div className="spinner-inner"></div>
  </div>
);

export interface Access {
  enable: boolean;
  message?: string;
  fallBackUrl?: string;
}
export const lazyFnDelay = (importFunc: any, access: Access = {
  enable: true
})=> {

  if (!access.enable) {
    return <FallBack access={access}></FallBack>
  }

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

// export const lazyFnTrue = (importFunc: any) => {
  
//     const LazyComponent = lazy(() => {
//         return new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(importFunc());
//           }, 1000);
//         });
//       });
//     //const LazyComponent = lazy(importFunc);
  
//     return <LazyComponent />;
//   }
  export const lazyFn = (importFunc: any) => {

    const LazyComponent = lazy(importFunc);
  
    return <Suspense fallback={<>Loading ....</>}>
      <LazyComponent />
    </Suspense>;
  }; 
