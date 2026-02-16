export function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDateTime(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatPrice(price: number): string {
  return `₹${price.toLocaleString("en-IN")}`;
}

export function generateQRCode(data: string): string {
  // TODO: Implement QR code generation
  return data;
}

export function isEventUpcoming(startDate: Date): boolean {
  return new Date(startDate) > new Date();
}

export function getEventStatus(event: any): string {
  if (!isEventUpcoming(event.startDate)) {
    return "completed";
  }
  return event.status;
}
