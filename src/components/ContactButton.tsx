import type { ReactNode } from 'react';
import { useState } from 'react';
import { ContactDialog } from './ContactDialog';

interface ContactButtonProps {
	children: ReactNode;
}

export function ContactButton({ children }: ContactButtonProps) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<button
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
			>
				{children}
			</button>
			<ContactDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
		</>
	);
}
