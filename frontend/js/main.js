



// Token helpers

export function setToken(token) {
    localStorage.setItem("token", token);
}

export function getToken() {
    return localStorage.getItem("token");
}

export function removeToken() {
    localStorage.removeItem("token");
}


// Admin token helpers

export function setAdminToken(token) {
    localStorage.setItem("admin_token", token);
}

export function getAdminToken() {
    return localStorage.getItem("admin_token");
}

export function removeAdminToken() {
    localStorage.removeItem("admin_token");
}


// API Fetch helper

export async function apiFetch(url, method="GET", data=null, isAdmin=false) {
    const token = isAdmin ? getAdminToken() : getToken();
    const headers = {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };

    const options = { method, headers };
    if(data) options.body = JSON.stringify(data);

    const res = await fetch(url, options);
    const resData = await res.json();
    return { ok: res.ok, data: resData };
}


// Risk label utilities

export function riskColor(label){
    switch(label){
        case "Low": return "green";
        case "Moderate": return "yellow";
        case "High": return "orange";
        case "Very High": return "red";
        default: return "black";
    }
}

export function riskValue(label){
    switch(label){
        case "Low": return 1;
        case "Moderate": return 2;
        case "High": return 3;
        case "Very High": return 4;
        default: return 0;
    }
}

// Google OAuth helper

// Redirects user to Google OAuth login
export function googleLogin(redirectUrl="/") {
    const clientId = "<YOUR_GOOGLE_CLIENT_ID>";
    const scope = "openid email profile";
    const authUrl = `https://accounts.google.com/o/oauth2/auth?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&scope=${scope}&prompt=consent&access_type=offline`;
    window.location.href = authUrl;
}


// Logout helper

export function logout(isAdmin=false){
    if(isAdmin) removeAdminToken();
    else removeToken();
    window.location.href = isAdmin ? "admin_login.html" : "index.html";
}

