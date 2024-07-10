import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { lazyFnDelay } from './lazy'
import AddCategory from '@/pages/admin/pages/categories/category-add/CategoryAdd'

const RouterSetup = () =>  {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={lazyFnDelay(() => import('@pages/home/Home'))}></Route>
        <Route path='*' element={lazyFnDelay(() => import('@pages/not-fond/404'))}></Route>
        <Route path='/admin' element={lazyFnDelay(() => import('@pages/admin/index'))}>
        <Route path='category' element={lazyFnDelay(() => import('@pages/admin/pages/categories/CategoryTable'))}></Route>
        <Route path='category/add' element={<AddCategory/>}></Route>
        <Route path='product' element={lazyFnDelay(() => import('@pages/admin/pages/products/ProductTable'))}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RouterSetup