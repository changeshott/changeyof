import { Megaphone, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";

interface RecentActivityProps {
  releases: any[];
  feedbacks: any[];
  className?: string;
}

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export default function RecentActivity({ releases = [], feedbacks = [], className = "" }: RecentActivityProps) {
  // Combine and sort by date
  const combinedActivity = [
    ...releases.map(r => ({
      id: `release-${r.id}`,
      type: 'release',
      date: new Date(r.created_at),
      data: r
    })),
    ...feedbacks.map(f => ({
      id: `feedback-${f.id}`,
      type: 'feedback',
      date: new Date(f.created_at),
      data: f
    }))
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 5); // take top 5

  return (
    <div className={`bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-xl ${className}`}>
      <div className="px-6 py-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <h3 className="font-semibold text-lg">Recent Activity</h3>
      </div>
      
      <div className="divide-y divide-white/5">
        {combinedActivity.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-sm">
            No recent activity to display.
          </div>
        ) : (
          combinedActivity.map((activity) => (
            <div key={activity.id} className="p-5 hover:bg-white/5 transition-colors">
              <div className="flex gap-4">
                <div className="mt-0.5 shrink-0">
                  {activity.type === 'release' ? (
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                      <Megaphone className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.data.sentiment === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                      activity.data.sentiment === 'negative' ? 'bg-rose-500/20 text-rose-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {activity.data.sentiment === 'positive' && <ThumbsUp className="w-4 h-4" />}
                      {activity.data.sentiment === 'negative' && <ThumbsDown className="w-4 h-4" />}
                      {activity.data.sentiment === 'neutral' && <MessageSquare className="w-4 h-4" />}
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  {activity.type === 'release' ? (
                    <>
                      <p className="text-sm text-white font-medium truncate">
                        Published <span className="text-indigo-400">"{activity.data.title}"</span>
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {activity.data.projects?.name} • {timeAgo(activity.date)}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-white font-medium truncate">
                        New {activity.data.sentiment} feedback
                      </p>
                      {activity.data.comment ? (
                        <p className="text-sm text-slate-300 italic mt-1 truncate">
                          "{activity.data.comment}"
                        </p>
                      ) : (
                        <p className="text-xs text-slate-500 mt-1">Reaction only</p>
                      )}
                      <p className="text-xs text-slate-400 mt-1">
                        on "{activity.data.release_notes?.title}" • {timeAgo(activity.date)}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
