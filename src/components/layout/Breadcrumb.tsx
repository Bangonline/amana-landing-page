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
        <nav className="flex items-center space-x-2 text-xs font-medium">
          {items.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <span className="text-gray-500 mx-2">/</span>
              )}
              {item.href ? (
                <Link 
                  href={item.href} 
                  className="text-orange-500 hover:text-orange-600 transition-colors uppercase"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-800 uppercase font-semibold">{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
