import type { GitHubActivity } from "@/lib/github";

const labels: Record<string, string> = {
  PushEvent: "push kode",
  CreateEvent: "membuat branch atau tag",
  PullRequestEvent: "memperbarui pull request",
  IssuesEvent: "memperbarui issue",
  IssueCommentEvent: "mengomentari issue",
  WatchEvent: "memberi star"
};

export default function OpenSourceActivity({ activities }: { activities: GitHubActivity[] }) {
  return (
    <section className="section activity-section" aria-labelledby="activity-title">
      <div className="section-heading">
        <p className="eyebrow">Open Source Activity</p>
        <h2 id="activity-title">Aktivitas terbaru di GitHub.</h2>
        <p>Kontribusi publik dan repository yang sedang dikerjakan oleh <a href="https://github.com/adiorany3" target="_blank" rel="noopener noreferrer">@adiorany3</a>.</p>
      </div>
      {activities.length ? (
        <ol className="activity-list">
          {activities.map((activity) => (
            <li className="activity-item" key={activity.id}>
              <span className="activity-dot" aria-hidden="true" />
              <div>
                <strong>{labels[activity.type] ?? "beraktivitas di"} <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.repo}</a></strong>
                <time dateTime={activity.createdAt}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(activity.createdAt))}</time>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <a className="btn ghost" href="https://github.com/adiorany3" target="_blank" rel="noopener noreferrer">Lihat aktivitas di GitHub ↗</a>
      )}
    </section>
  );
}
