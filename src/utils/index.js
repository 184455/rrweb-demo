// utils

export function formatDate (_date) {
  const date = new Date(_date);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const r = String(date.getDate()).padStart(2, '0');

  const h = String(date.getHours()).padStart(2, '0');
  const f = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');

  return `${y}-${m}-${r} ${h}:${f}:${s}`;
}
