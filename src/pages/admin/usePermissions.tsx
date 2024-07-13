import { useState, useEffect } from 'react';

const usePermissions = (userStore : any) => {
  const [per, setPer] = useState({
    read: false,
    create: false,
    update: false,
    delete: false,
  });

  useEffect(() => {
    if (!userStore.loading) {
      const newPer = {
        read: userStore.data?.permission?.includes("category.r") || false,
        create: userStore.data?.permission?.includes("category.c") || false,
        update: userStore.data?.permission?.includes("category.u") || false,
        delete: userStore.data?.permission?.includes("category.d") || false,
      };

      setPer(newPer);

      if (!newPer.read) {
        window.location.href = "/admin";
      }
    }
  }, [userStore.loading, userStore.data]);

  return per;
};

export default usePermissions;

