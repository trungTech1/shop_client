
import { useEffect } from 'react'
import { Access } from './lazy'
export default function FallBack({ access }: {
  access: Access
}) {

  // const userStore = useSelector((store: StoreType) => store.userStore)

  // useEffect(() => {
  //   if (!userStore.loading) {
  //     if (access.fallBackUrl) {
  //       window.location.href
  //     }
  //   }
  // }, [userStore.loading, userStore.data])

  useEffect(() => {
      if (access.fallBackUrl) {
        window.location.href = access.fallBackUrl
      }
  }, [])
  return (
    <div>{access.message || "gi do"}</div>
  )
}
