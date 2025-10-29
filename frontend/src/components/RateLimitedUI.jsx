 import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className = "max-w-3xL mx-auto px-4 py-8">
        <div className = "bg-primary/10 border border-primary/30 rounded-leg shadow-md">
           <div className="flex felx-col md:flex-row items-center p-6">
              <div className = "flex-shink-0 bg-primary/20 rounded-full p-4 rounded-full mb-4 md:mb-0 md:mr-6">
              <ZapIcon className="size-8 text-primary" />
              </div>
                <div className = " flex-1 text-center md:text-left">
                    <h3 className=" text-xl font-bold mb-2"> Rate Limiter Reached! </h3>
                    <p className = " text-base-content mb-1">
                    You've reached the maximum number of requests allowed. Please wait a moment before trying again.
                    </p>
                </div>
           </div>
        </div>

    </div>
  )
}

export default RateLimitedUI