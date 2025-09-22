import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="py-3" style={{ backgroundColor: '#BED1E3' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav 
          aria-label="Breadcrumb navigation"
          role="navigation"
        >
          <ol className="flex items-center space-x-2 text-xs font-medium list-none">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <span 
                    className="text-gray-500 mx-2" 
                    aria-hidden="true"
                    role="presentation"
                  >
                    /
                  </span>
                )}
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className="text-orange-500 hover:text-orange-600 focus:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-sm transition-colors"
                    aria-label={`Navigate to ${item.label}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span 
                    className="text-gray-800 font-semibold"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
