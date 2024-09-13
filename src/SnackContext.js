import { createContext, useCallback, useEffect, useMemo, useState } from "react"
export const SnackBarContext = createContext()

const AUTO_DISMISS = 3000;

export function SnackBarProvider({ children }) {
  const [alerts, setAlerts] = useState([])
  
  const activeAlertIds = alerts.join(',')
  useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(() => setAlerts((alerts) => alerts.slice(0, alerts.length - 1)), AUTO_DISMISS)
      return () => clearTimeout(timer)
    }
  }, [activeAlertIds])

  const addAlert = useCallback((content) => setAlerts((alerts) => [content, ...alerts]), [])

  const value = useMemo(() => ({ addAlert }), [addAlert])
    
  return (
    <SnackBarContext.Provider value={value}>
        {alerts.length !==0 &&
            <div className="snackbar p-2 d-flex flex-column-reverse">
      {alerts.map((alert) =>
          <div className="p-2 alert text-dark bg-light shadow rounded border-success snackbar-alert" role="alert" >
                {alert}
        </div>)
    }
    </div>
    }
    {children}
    </SnackBarContext.Provider>
  )
}