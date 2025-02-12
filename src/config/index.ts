export function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
}