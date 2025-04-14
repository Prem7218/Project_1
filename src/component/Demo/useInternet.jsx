import React, { useEffect, useState } from 'react'

const useInternet = () => {
    const [ OnlineStatus, setOnlineStatus ] = useState(navigator.onLine);

    useEffect(() => {

        const handleOnline = () => setOnlineStatus(true);
        const handleOffline= () => setOnlineStatus(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        }

    }, []);

  return OnlineStatus;
}

export default useInternet;
