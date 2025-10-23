export function confirmDiscardIfUnsaved(hasUnsavedChanges: boolean, reset: () => void) {
	if (!hasUnsavedChanges) return true;
	const confirmed = window.confirm('You have unsaved changes. Discard them?');
	if (confirmed) reset();
	return confirmed;
}
