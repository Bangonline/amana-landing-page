import { VillageConsultant } from '@/types/village'

interface ConsultantPanelProps {
  consultant: VillageConsultant
  villageName: string
  className?: string
}

export function ConsultantPanel({ consultant, villageName, className = '' }: ConsultantPanelProps) {
  const isDarkBackground = className.includes('bg-gray-700') || className.includes('bg-blue-900')
  
  return (
    <div className={`${isDarkBackground ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-8 rounded-lg shadow-sm border ${className}`}>
      <div className="text-center space-y-6">
        <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto overflow-hidden">
          {consultant.image ? (
            <img 
              src={consultant.image} 
              alt={`${consultant.firstName} ${consultant.lastName} - ${villageName} Consultant`} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-600 text-2xl">👨</span>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <h4 className={`text-xl font-bold ${isDarkBackground ? 'text-white' : 'text-black'}`}>
            {consultant.firstName && consultant.lastName 
              ? `${consultant.firstName} ${consultant.lastName}` 
              : 'Village Consultant'}
          </h4>
          <p className={`leading-relaxed px-2 ${isDarkBackground ? 'text-gray-300' : 'text-gray-700'}`}>
            {consultant.description}
          </p>
        </div>
        <div className="space-y-4 pt-2 flex flex-col items-center">
          <h5 className={`text-lg font-semibold mb-2 ${isDarkBackground ? 'text-white' : 'text-black'}`}>Book a Tour</h5>
          <a 
            href={consultant.phone ? `tel:${consultant.phone.replace(/\s/g, '')}` : "tel:1300262626"}
            className={`inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg h-10 px-6 text-base rounded-lg text-white hover:bg-orange-600 ${consultant.firstName ? 'bg-orange-500' : 'bg-white border border-black text-black hover:bg-gray-100'}`}
          >
            {consultant.phone || '1300 26 26 26'}
          </a>
          <a 
            href={consultant.email ? `mailto:${consultant.email}?subject=Enquiry about ${villageName} - Tour and Information Request` : "mailto:contact@amanaliving.com.au?subject=Enquiry about Retirement Village - Tour and Information Request"} 
            className={`${isDarkBackground ? 'text-white' : 'text-black'} hover:underline flex items-center justify-center gap-2 py-2`}
          >
            {consultant.email || 'contact@amanaliving.com.au'}
          </a>
        </div>
      </div>
    </div>
  )
}
