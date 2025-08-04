import { useState, useEffect } from "react";
export const Dashboard = () => {
    const [loading, setLoading] = useState(true)

    
      useEffect(() => {
        // ✅ Simulate loading time (e.g. data fetch)
        const timer = setTimeout(() => {
          setLoading(false);
        }, 2000); // 2 seconds spinner
    
        return () => clearTimeout(timer);
      }, []);
    
       if (loading) {
        return (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-500"></div>
            <p className="mt-4 text-white">Loading...</p>
          </div>
        );
      }
    return(
        <>
            <div class="text-white w-full px-4 py-3 md:py-4 md:text-2xl">
                This is your dashboard 
            </div>
        </>
    )
}

