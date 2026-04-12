const isLocalHost =
	typeof window !== "undefined" &&
	["localhost", "127.0.0.1"].includes(window.location.hostname);

const API_BASE_URL = isLocalHost
	? import.meta.env.VITE_LOCAL_API_URL || "http://localhost:5000"
	: import.meta.env.VITE_API_URL || "http://localhost:5000";

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

const getAuthHeader = () => {
	const storedUser = localStorage.getItem("staffsphereUser");

	if (!storedUser) return {};

	try {
		const user = JSON.parse(storedUser);
		if (user?.token) {
			return { Authorization: `Bearer ${user.token}` };
		}
	} catch {
		// ignore malformed local storage values
	}

	return {};
};

const request = async (path, options = {}) => {
	const { body, headers = {}, ...restOptions } = options;
	const isFormData = body instanceof FormData;

	const response = await fetch(buildUrl(path), {
		credentials: "include",
		...restOptions,
		headers: {
			...(isFormData ? {} : { "Content-Type": "application/json" }),
			...getAuthHeader(),
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