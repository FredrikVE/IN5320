// src/utils/formatDate.js
export const formatDateTime = (iso) =>
    iso ? new Date(iso).toLocaleString() : "—"
