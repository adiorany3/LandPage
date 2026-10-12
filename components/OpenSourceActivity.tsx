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
        <p className="eyebrow">OPEN SOURCE / 01</p>
        <h2 id="activity-title">Aktivitas terbaru <span>di GitHub.</span></h2>
        <p>Jejak kontribusi publik dari <a href="https://github.com/adiorany3" target="_blank" rel="noopener noreferrer">@adiorany3 ↗</a>. Data diperbarui berkala.</p>
        <span className="activity-status"><span aria-hidden="true" /> {activities.length ? `${activities.length} AKTIVITAS PUBLIK` : "LIHAT PROFIL GITHUB"}</span>
      </div>
      {activities.length ? (
        <ol className="activity-list">
          {activities.map((activity) => (
            <li className="activity-item" key={activity.id}>
              <span className="activity-dot" aria-hidden="true" />
              <div className="activity-info">
                <span className="activity-type">{labels[activity.type] ?? "beraktivitas di"}</span>
                <a href={activity.url} target="_blank" rel="noopener noreferrer">{activity.repo} <span aria-hidden="true">↗</span></a>
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
