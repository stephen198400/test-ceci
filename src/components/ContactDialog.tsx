'use client';
import { useForm } from '@formspree/react';
import type { FormEvent } from 'react';
import { useEffect, useState } from 'react';

interface ContactDialogProps {
	isOpen: boolean;
	onClose: () => void;
}

export function ContactDialog({ isOpen, onClose }: ContactDialogProps) {
	const [state, handleSubmit] = useForm('mvggyrpw');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [showSuccess, setShowSuccess] = useState(false);

	useEffect(() => {
		if (state.succeeded) {
			setShowSuccess(true);
			setTimeout(() => {
				onClose();
				setShowSuccess(false);
				setErrors({});
			}, 2000);
		}
	}, [state.succeeded, onClose]);

	const validateForm = (formData: FormData) => {
		const newErrors: Record<string, string> = {};

		const name = formData.get('name') as string;
		if (!name || name.length < 2) {
			newErrors.name = 'Name must be at least 2 characters';
		}

		const address = formData.get('address') as string;
		if (!address) {
			newErrors.address = 'Address is required';
		}

		const email = formData.get('email') as string;
		if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
			newErrors.email = 'Please enter a valid email address';
		}

		const phone = formData.get('phone') as string;
		if (!phone) {
			newErrors.phone = 'Phone number is required';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);

		if (!validateForm(formData)) {
			return;
		}

		await handleSubmit(e);
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg w-full max-w-md">
				<div className="p-6">
					{!showSuccess ? (
						<>
							<div className="flex justify-between items-center mb-4">
								<h2 className="text-xl font-semibold">Get Free Consultation</h2>
								<button
									onClick={onClose}
									className="text-gray-500 hover:text-gray-700"
								>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<form onSubmit={onSubmit} className="space-y-4">
								<div>
									<label className="block text-sm font-medium mb-1">
										Name *
									</label>
									<input
										type="text"
										name="name"
										className="w-full px-3 py-2 border rounded-md"
										placeholder="John Doe"
										required
									/>
									{errors.name && (
										<p className="text-red-500 text-xs mt-1">{errors.name}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Address *
									</label>
									<input
										type="text"
										name="address"
										className="w-full px-3 py-2 border rounded-md"
										placeholder="123 Main St, Oakland, CA 94539"
										required
									/>
									{errors.address && (
										<p className="text-red-500 text-xs mt-1">
											{errors.address}
										</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Email *
									</label>
									<input
										type="email"
										name="email"
										className="w-full px-3 py-2 border rounded-md"
										placeholder="john.doe@gmail.com"
										required
									/>
									{errors.email && (
										<p className="text-red-500 text-xs mt-1">{errors.email}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Phone *
									</label>
									<input
										type="tel"
										name="phone"
										className="w-full px-3 py-2 border rounded-md"
										placeholder="(123) 456-7890"
										required
									/>
									{errors.phone && (
										<p className="text-red-500 text-xs mt-1">{errors.phone}</p>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-1">
										Additional Notes
									</label>
									<textarea
										name="notes"
										className="w-full px-3 py-2 border rounded-md min-h-[100px]"
										placeholder="Any additional information..."
									/>
								</div>

								<button
									type="submit"
									disabled={state.submitting}
									className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
								>
									{state.submitting ? 'Submitting...' : 'Submit'}
								</button>
							</form>
						</>
					) : (
						<div className="text-center py-8">
							<div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
								<svg
									className="w-6 h-6 text-green-600"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</div>
							<h3 className="text-xl font-semibold mb-2">
								Thank you for your submission!
							</h3>
							<p className="text-gray-600">We will contact you soon.</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
