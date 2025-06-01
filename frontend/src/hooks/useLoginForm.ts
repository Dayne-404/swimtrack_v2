import { useState } from "react";

export const useLoginForm = () => {
	const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
	const [errors, setErrors] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
	};

    const validateCredentials = (): boolean => {
		let valid = true;
		let emailError = '', passwordError = '';

		if (!userCredentials.email.trim()) {
			emailError = 'Invalid email address';
			valid = false;
		}

		if (!userCredentials.password.trim()) {
			passwordError = 'Password cannot be empty';
			valid = false;
		}

		setErrors({ email: emailError, password: passwordError });
		return valid;
	};

    return {
		userCredentials,
		setUserCredentials,
		errors,
		setErrors,
		loading,
		setLoading,
		handleChange,
		validateCredentials
	};
}