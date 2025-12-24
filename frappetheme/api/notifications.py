import frappe
from frappe.desk.notifications import get_notifications

@frappe.whitelist()
@frappe.read_only()
def get_notification_count():
    """Return total unread count across all configured doctypes"""
    notifications = get_notifications()
    total = sum(notifications.get("open_count_doctype", {}).values())
    return total
