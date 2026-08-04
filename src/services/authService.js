import api from "../api/api";


export const refreshAccessToken = async () => {
    try {
        console.log("Calling Refresh API...");

        const response = await api.post("/auth/refresh-token", {
            refreshToken: localStorage.getItem("refreshToken"),
        });

        const newAccessToken = response.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        // Decode JWT payload without any library
        const decoded = JSON.parse(atob(newAccessToken.split(".")[1]));

        console.log("✅ Access Token Updated");
        console.log("Decoded Token:", decoded);
        console.log("Expiry:", new Date(decoded.exp * 1000));

    } catch (error) {
        console.error(error);
    }
};