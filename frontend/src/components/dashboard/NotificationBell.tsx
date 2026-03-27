import { Bell, Check, Trash2, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api } from "../../lib/api";

type Notification = {
  id: string;
  type: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
};

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await api.get("/api/notifications/unread-count");
        setUnreadCount(res.data.count || 0);
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    fetchUnreadCount();
    // Refresh every minute
    const interval = setInterval(fetchUnreadCount, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/notifications");
        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleMarkAllRead = async () => {
    try {
      await api.patch("/api/notifications/read-all");
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkRead = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.patch(`/api/notifications/${id}/read`);
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await api.delete(`/api/notifications/${id}`);
      setNotifications(notifications.filter(n => n.id !== id));
      if (notifications.find(n => n.id === id && !n.read)) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-[#ACABAA] hover:text-[#6BDC9F] cursor-pointer transition-colors p-2 -m-2 rounded-full hover:bg-[#131313]"
      >
        <Bell size={22} className="sm:w-6 sm:h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#E87A7A]"></span>
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-[#131313] border border-[#262626] rounded-md shadow-2xl z-50 overflow-hidden flex flex-col max-h-[80vh]">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#0E0E0E]">
            <h3 className="font-manrope font-bold text-[#E7E5E5] text-base">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                onClick={handleMarkAllRead}
                className="text-xs font-inter text-[#6BDC9F] hover:text-white transition-colors"
              >
                Mark all as read
              </button>
            )}
            <button onClick={() => setIsOpen(false)} className="md:hidden text-[#ACABAA]">
              <X size={18} />
            </button>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 p-2">
            {notifications.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <Bell size={32} className="text-[#262626] mb-3" />
                <p className="text-[#ACABAA] font-inter text-sm">No notifications yet.</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-1">
                {notifications.map((notif) => (
                  <li 
                    key={notif.id} 
                    className={`relative p-3 rounded-sm border ${notif.read ? 'bg-[#0A0A0A] border-transparent opacity-70' : 'bg-[#1A1A1A] border-[#333]'} hover:bg-[#202020] transition-colors group cursor-default`}
                  >
                    {!notif.read && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#6BDC9F] rounded-l-sm"></div>
                    )}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <p className={`font-semibold text-sm font-inter ${notif.read ? 'text-[#ACABAA]' : 'text-[#E7E5E5]'}`}>
                          {notif.title}
                        </p>
                        <p className="text-xs text-[#87948A] mt-1 font-inter leading-relaxed">
                          {notif.body}
                        </p>
                        <p className="text-[10px] text-[#5A5A5A] mt-2 font-inter tracking-wider">
                          {formatDate(notif.createdAt)}
                        </p>
                      </div>
                      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                        {!notif.read && (
                          <button 
                            onClick={(e) => handleMarkRead(notif.id, e)}
                            className="p-1.5 text-[#ACABAA] hover:text-[#6BDC9F] hover:bg-[#6BDC9F]/10 rounded-sm transition-colors"
                            title="Mark as read"
                          >
                            <Check size={14} />
                          </button>
                        )}
                        <button 
                          onClick={(e) => handleDelete(notif.id, e)}
                          className="p-1.5 text-[#ACABAA] hover:text-[#E87A7A] hover:bg-[#E87A7A]/10 rounded-sm transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
