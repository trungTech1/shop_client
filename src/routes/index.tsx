import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { lazyFnDelay } from './lazy'

const RouterSetup = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={lazyFnDelay(() => import('@pages/home/Home'))}>
          <Route index element={lazyFnDelay(() => import('@pages/home/components/Homepage'))}></Route>
          <Route path='/cart' element={lazyFnDelay(() => import('@pages/cart/Cart'))}></Route>
          <Route path='/checkout' element={lazyFnDelay(() => import('@pages/checkout/Checkout'))}></Route>
        </Route>
        <Route path='/register' element={lazyFnDelay(() => import('@pages/authen/Register'))}></Route>
        <Route path='/login' element={lazyFnDelay(() => import('@pages/authen/LogIn'))}></Route>
        <Route path='*' element={lazyFnDelay(() => import('@/pages/not-found/404'))}></Route>
        <Route path='/admin' element={lazyFnDelay(() => import('@pages/admin/index'))}>
        <Route path='category' element={lazyFnDelay(() => import('@pages/admin/pages/categories/CategoryTable'))}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterSetup