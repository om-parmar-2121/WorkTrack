const isLocalhost =
	window.location.hostname === "localhost" ||
	window.location.hostname === "127.0.0.1";

const API_BASE_URL = isLocalhost
	? import.meta.env.VITE_LOCAL_API_URL || "http://localhost:5000"
	: import.meta.env.VITE_API_URL || "http://localhost:5000";

const SESSION_STORAGE_KEY = "staffsphereUser";

const getStoredUser = () => {
	const storedUser = localStorage.getItem(SESSION_STORAGE_KEY);

	if (!storedUser) return null;

	try {
		return JSON.parse(storedUser);
	} catch {
		localStorage.removeItem(SESSION_STORAGE_KEY);
		return null;
	}
};

const decodeBase64Url = (value) => {
	const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
	const padding = normalized.length % 4;
	const padded = padding ? normalized + "=".repeat(4 - padding) : normalized;
	return atob(padded);
};

const isTokenExpired = (token) => {
	if (!token) return true;

	try {
		const parts = token.split(".");
		if (parts.length !== 3) return true;

		const payload = JSON.parse(decodeBase64Url(parts[1]));
		if (!payload?.exp) return false;

		return payload.exp * 1000 <= Date.now();
	} catch {
		return true;
	}
};

const clearSessionAndRedirect = () => {
	localStorage.removeItem(SESSION_STORAGE_KEY);

	if (window.location.pathname !== "/") {
		window.location.replace("/");
	}
};

const buildUrl = (path) => {
	if (!path) return API_BASE_URL;
	if (/^https?:\/\//i.test(path)) return path;
	return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const parseResponse = async (response) => {
	const contentType = response.headers.get("content-type") || "";

	if (contentType.includes("application/json")) {
		return response.json();
	}

	return response.text();
};

const request = async (path, options = {}) => {
	const { body, headers = {}, ...restOptions } = options;
	const isFormData = body instanceof FormData;
	const storedUser = getStoredUser();
	const token = storedUser?.token;

	if (token && isTokenExpired(token)) {
		clearSessionAndRedirect();
		throw new Error("Session expired. Please log in again.");
	}

	const response = await fetch(buildUrl(path), {
		credentials: "include",
		...restOptions,
		headers: {
			...(isFormData ? {} : { "Content-Type": "application/json" }),
			...(token ? { Authorization: `Bearer ${token}` } : {}),
			...headers,
		},
		body: isFormData
			? body
			: body !== undefined
				? JSON.stringify(body)
				: undefined,
	});

	const data = await parseResponse(response);

	if (!response.ok) {
		const message =
			(typeof data === "object" && data?.message) ||
			`Request failed with status ${response.status}`;

		if (response.status === 401) {
			clearSessionAndRedirect();
		}

		throw new Error(message);
	}

	return data;
};

const api = {
	request,
	get: (path, options = {}) => request(path, { ...options, method: "GET" }),
	post: (path, body, options = {}) =>
		request(path, { ...options, method: "POST", body }),
	patch: (path, body, options = {}) =>
		request(path, { ...options, method: "PATCH", body }),
	put: (path, body, options = {}) =>
		request(path, { ...options, method: "PUT", body }),
	delete: (path, options = {}) => request(path, { ...options, method: "DELETE" }),
};

export default api;