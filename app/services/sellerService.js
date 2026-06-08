const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

// Get seller store settings
export async function getSellerSettings(token) {
  const res = await fetch(`${BASE_URL}/seller/settings`, {
    headers: authHeader(token),
  });
  if (!res.ok) throw new Error("Settings load nahi hui");
  return res.json(); // { settings: { dukaanName, subdomain, brandColor, logo, banner } }
}

// Update store settings (text fields)
export async function updateSellerSettings(data, token) {
  const res = await fetch(`${BASE_URL}/seller/settings`, {
    method: "PUT",
    headers: { ...authHeader(token), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Settings save nahi hui");
  return res.json();
}

// Upload logo or banner (multipart/form-data)
export async function uploadStoreImage(file, type, token) {
  // type: 'logo' | 'banner'
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  const res = await fetch(`${BASE_URL}/seller/settings/upload`, {
    method: "POST",
    headers: authHeader(token), // no Content-Type: browser sets multipart boundary
    body: formData,
  });
  if (!res.ok) throw new Error("Image upload nahi hua");
  return res.json(); // { url: "https://..." }
}

// Toggle store live/offline
export async function toggleStoreLive(isLive, token) {
  const res = await fetch(`${BASE_URL}/seller/settings/live`, {
    method: "PATCH",
    headers: { ...authHeader(token), "Content-Type": "application/json" },
    body: JSON.stringify({ isLive }),
  });
  if (!res.ok) throw new Error("Store status update nahi hua");
  return res.json();
}