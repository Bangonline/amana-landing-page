import { VillageConsultant } from '@/types/village'

interface ConsultantPanelProps {
  consultant: VillageConsultant
  villageName: string
  className?: string
}

export function ConsultantPanel({ consultant, villageName, className = '' }: ConsultantPanelProps) {
  const isDarkBackground = className.includes('bg-gray-700') || className.includes('bg-blue-900')
  
  return (
    <div className={`${isDarkBackground ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} p-10 rounded-lg shadow-sm border ${className}`}>
      <div className="text-center space-y-8">
        {/* Consultant Image and Name Section */}
        <div className="space-y-6">
          <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto overflow-hidden shadow-md">
            {consultant.image ? (
              <img 
                src={consultant.image} 
                alt={`${consultant.firstName} ${consultant.lastName} - ${villageName} Consultant`} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-gray-600 text-3xl">👨</span>
              </div>
            )}
          </div>
          <h4 className={`text-2xl font-bold ${isDarkBackground ? 'text-white' : 'text-black'}`}>
            {consultant.firstName && consultant.lastName 
              ? `${consultant.firstName} ${consultant.lastName}` 
              : 'Village Consultant'}
          </h4>
        </div>

        {/* Description Section */}
        <div className="max-w-md mx-auto">
          <p className={`leading-relaxed text-base ${isDarkBackground ? 'text-gray-300' : 'text-gray-700'}`}>
            {consultant.description}
          </p>
        </div>

        {/* Call to Action Section */}
        <div className="space-y-6 pt-2">
          <h5 className={`text-xl font-semibold ${isDarkBackground ? 'text-white' : 'text-black'}`}>Book a Tour</h5>
          <div className="space-y-4">
            <a 
              href={consultant.phone ? `tel:${consultant.phone.replace(/\s/g, '')}` : "tel:1300262626"}
              className={`inline-flex items-center justify-center font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer disabled:cursor-not-allowed hover:-translate-y-0.5 shadow-md hover:shadow-lg h-12 px-8 text-lg rounded-lg text-white hover:bg-orange-600 ${consultant.firstName ? 'bg-orange-500' : 'bg-white border border-black text-black hover:bg-gray-100'}`}
            >
              {consultant.phone || '1300 26 26 26'}
            </a>
            <div className="pt-2">
              <a 
                href={consultant.email ? `mailto:${consultant.email}?subject=Enquiry about ${villageName} - Tour and Information Request` : "mailto:contact@amanaliving.com.au?subject=Enquiry about Retirement Village - Tour and Information Request"} 
                className={`${isDarkBackground ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'} hover:underline text-sm transition-colors duration-200`}
              >
                {consultant.email || 'contact@amanaliving.com.au'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
