declare global {
	export type Severity = 'success' | 'error'
	
	export interface Alert {
		open: boolean;
		message: string;
		severity: Severity;
	}
}

export {};
