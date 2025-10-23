import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

export function useNavigationBlocker(
	shouldWarn: boolean,
	message: string = 'You have unsaved changes. Are you sure you want to leave this page?'
) {
	const blocker = useBlocker(shouldWarn);

	useEffect(() => {
		if (!shouldWarn) return;

		if (blocker.state === 'blocked') {
			const confirmLeave = window.confirm(message);
			if (confirmLeave) blocker.proceed();
			else blocker.reset();
		}
	}, [blocker, shouldWarn, message]);

	useEffect(() => {
		if (!shouldWarn) return;

		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = message; // required for most browsers
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => window.removeEventListener('beforeunload', handleBeforeUnload);
	}, [shouldWarn, message]);
}
