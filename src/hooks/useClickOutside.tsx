import { useEffect } from 'react';

export const useClickOutside = (
	ref: React.RefObject<HTMLElement>,
	onClickOutside: () => void,
	isEnabled = true
) => {
	useEffect(() => {
		if (!isEnabled) return;

		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				onClickOutside();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, onClickOutside, isEnabled]);
};
