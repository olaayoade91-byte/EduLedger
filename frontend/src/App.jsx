import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api";

function App() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState("Dashboard");

  async function loadSchools() {
    try {
      const response = await fetch(`${API_URL}/schools`);

      if (!response.ok) {
        throw new Error("Failed to load schools.");
      }

      const data = await response.json();
      setSchools(data.schools);
      setError("");
    } catch {
      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let cancelled = false;

    fetch(`${API_URL}/schools`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load schools.");
        }

        return response.json();
      })
      .then((data) => {
        if (!cancelled) {
          setSchools(data.schools);
          setError("");
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError("Unable to connect to the server.");
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setMessageType("");

    try {
      const response = await fetch(`${API_URL}/schools`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: schoolName.trim(),
          email: schoolEmail.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed.");
      }

      setMessage("School registered successfully!");
      setMessageType("success");
      setSchoolName("");
      setSchoolEmail("");

      await loadSchools();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setSubmitting(false);
    }
  }

  const filteredSchools = schools.filter((school) =>
    `${school.name} ${school.email}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const navigation = [
    { name: "Dashboard", icon: "▦" },
    { name: "Schools", icon: "▤" },
    { name: "Students", icon: "♙" },
    { name: "Payments", icon: "↗" },
    { name: "Transactions", icon: "⇄" },
  ];

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <a className="brand" href="#dashboard">
          <div className="brand-mark">E</div>

          <div className="brand-text">
            <span>EduLedger</span>
            <small>EDUCATION FINANCE</small>
          </div>
        </a>

        <div className="sidebar-section-label">WORKSPACE</div>

        <nav className="sidebar-nav">
          {navigation.map((item) => (
            <button
              key={item.name}
              className={`nav-item ${
                activePage === item.name ? "active" : ""
              }`}
              onClick={() => {
                setActivePage(item.name);

                if (item.name === "Schools" || item.name === "Dashboard") {
                  document
                    .getElementById(
                      item.name === "Schools" ? "schools" : "dashboard",
                    )
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.name}</span>

              {item.name === "Schools" && (
                <span className="nav-count">{schools.length}</span>
              )}

              {["Students", "Payments", "Transactions"].includes(
                item.name,
              ) && <span className="coming-soon-dot" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-section-label settings-label">
          PREFERENCES
        </div>

        <button
          className="nav-item"
          onClick={() => setMessage("Settings will be available soon.")}
        >
          <span className="nav-icon">⚙</span>
          <span>Settings</span>
        </button>

        <div className="sidebar-bottom">
          <div className="help-card">
            <div className="help-icon">✦</div>
            <h4>Need a hand?</h4>
            <p>We're here to help you manage your school finances.</p>

            <button
              onClick={() =>
                setMessage("Support resources will be available soon.")
              }
            >
              Get support <span>↗</span>
            </button>
          </div>

          <div className="sidebar-footer">
            <div className="footer-avatar">E</div>

            <div>
              <strong>EduLedger</strong>
              <small>Management portal</small>
            </div>

            <span className="footer-menu">•••</span>
          </div>
        </div>
      </aside>

      <main className="dashboard-main" id="dashboard">
        <header className="topbar">
          <div className="breadcrumb">
            <span>Workspace</span>
            <span className="breadcrumb-separator">/</span>
            <strong>{activePage}</strong>
          </div>

          <div className="topbar-right">
            <label className="search-box">
              <span>⌕</span>

              <input
                type="search"
                placeholder="Search schools..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <kbd>/</kbd>
            </label>

            <button
              className="notification-button"
              aria-label="Notifications"
              onClick={() =>
                setMessage("You're all caught up on notifications.")
              }
            >
              ♧
              <span />
            </button>

            <div className="topbar-divider" />

            <div className="admin-profile">
              <div className="admin-avatar">A</div>

              <div className="admin-details">
                <strong>Administrator</strong>
                <span>Workspace admin</span>
              </div>

              <span className="profile-chevron">⌄</span>
            </div>
          </div>
        </header>

        <div className="page-content">
          <section className="welcome-banner">
            <div className="welcome-content">
              <div className="eyebrow">
                <span className="live-dot" />
                YOUR EDUCATION FINANCE HUB
              </div>

              <h1>
                Welcome to your
                <br />
                <span>command center.</span>
              </h1>

              <p>
                One clear view of your schools today. Manage your institutions
                and keep everything organized.
              </p>

              <button
                className="banner-button"
                onClick={() =>
                  document
                    .getElementById("register-school")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                + Register a school <span>→</span>
              </button>
            </div>

            <div className="banner-art" aria-hidden="true">
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />

              <div className="art-card art-card-back">
                <div className="art-card-line" />
                <div className="art-card-line short" />
                <div className="art-card-circle" />
              </div>

              <div className="art-card art-card-front">
                <div className="art-logo">E</div>
                <div className="art-card-title">EDULEDGER</div>
                <div className="art-card-subtitle">SCHOOL MANAGEMENT</div>

                <div className="art-card-bottom">
                  <span>EDUCATION</span>
                  <span>✳</span>
                </div>
              </div>

              <div className="art-floating floating-top">✦</div>
              <div className="art-floating floating-bottom">↗</div>
            </div>
          </section>

          <section className="stats-grid">
            <article className="stat-card">
              <div className="stat-top">
                <div className="stat-icon green-icon">▤</div>
                <span className="stat-label">INSTITUTIONS</span>
              </div>

              <div className="stat-number">
                {loading ? "—" : schools.length}
              </div>

              <div className="stat-bottom">
                <span className="stat-indicator">●</span>
                <span>Registered schools</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <div className="stat-icon purple-icon">♙</div>
                <span className="stat-label">STUDENTS</span>
              </div>

              <div className="stat-number">—</div>

              <div className="stat-bottom">
                <span>Student tracking not yet active</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <div className="stat-icon orange-icon">↗</div>
                <span className="stat-label">PAYMENTS</span>
              </div>

              <div className="stat-number">—</div>

              <div className="stat-bottom">
                <span>Payment tracking not yet active</span>
              </div>
            </article>

            <article className="stat-card">
              <div className="stat-top">
                <div className="stat-icon blue-icon">⇄</div>
                <span className="stat-label">TRANSACTIONS</span>
              </div>

              <div className="stat-number">—</div>

              <div className="stat-bottom">
                <span>Transaction tracking not yet active</span>
              </div>
            </article>
          </section>

          <div className="content-grid">
            <section className="panel register-panel" id="register-school">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">GET STARTED</span>
                  <h2>Register a school</h2>
                  <p>Add an institution to your workspace.</p>
                </div>

                <div className="panel-heading-icon">＋</div>
              </div>

              <form className="registration-form" onSubmit={handleSubmit}>
                <div className="form-field">
                  <label htmlFor="schoolName">School name</label>

                  <input
                    id="schoolName"
                    type="text"
                    placeholder="e.g. Greenfield Academy"
                    value={schoolName}
                    onChange={(event) => setSchoolName(event.target.value)}
                    maxLength={150}
                    required
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="schoolEmail">Official email address</label>

                  <input
                    id="schoolEmail"
                    type="email"
                    placeholder="admin@school.edu"
                    value={schoolEmail}
                    onChange={(event) => setSchoolEmail(event.target.value)}
                    maxLength={254}
                    required
                  />

                  <small>Use a unique email address for each school.</small>
                </div>

                <button
                  className="submit-button"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Register institution"}
                  <span>→</span>
                </button>

                {message && (
                  <div
                    className={`form-message ${messageType}`}
                    role="status"
                  >
                    {message}
                  </div>
                )}
              </form>

              <div className="secure-note">
                <span>✓</span>
                Your school records are stored in your database.
              </div>
            </section>

            <section className="panel overview-panel">
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">AT A GLANCE</span>
                  <h2>Workspace overview</h2>
                  <p>Your institution management progress.</p>
                </div>
              </div>

              <div className="overview-visual">
                <div className="overview-ring">
                  <div className="overview-ring-inner">
                    <span>✳</span>
                    <strong>{loading ? "—" : schools.length}</strong>
                    <small>schools</small>
                  </div>
                </div>

                <div className="overview-legend">
                  <div className="legend-row">
                    <span className="legend-dot registered-dot" />

                    <div>
                      <strong>Registered institutions</strong>
                      <small>Saved in your workspace</small>
                    </div>
                  </div>

                  <div className="legend-row">
                    <span className="legend-dot pending-dot" />

                    <div>
                      <strong>Payment management</strong>
                      <small>Coming in a future step</small>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overview-footer">
                <span className="overview-footer-icon">✦</span>

                <div>
                  <strong>Built for better school management</strong>
                  <p>More tools will become available as we build EduLedger.</p>
                </div>
              </div>
            </section>
          </div>

          <section className="panel directory-panel" id="schools">
            <div className="directory-heading">
              <div>
                <span className="panel-kicker">YOUR INSTITUTIONS</span>
                <h2>School directory</h2>
                <p>View and manage schools registered in your workspace.</p>
              </div>

              <div className="directory-actions">
                <span className="total-badge">
                  {schools.length} {schools.length === 1 ? "school" : "schools"}
                </span>

                <button
                  className="refresh-button"
                  onClick={loadSchools}
                  disabled={loading}
                >
                  ↻ Refresh
                </button>
              </div>
            </div>

            {error && <div className="directory-error">{error}</div>}

            <div className="table-wrapper">
              <table className="school-table">
                <thead>
                  <tr>
                    <th>INSTITUTION</th>
                    <th>EMAIL ADDRESS</th>
                    <th>DATE REGISTERED</th>
                    <th>STATUS</th>
                  </tr>
                </thead>

                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="empty-state">
                        Loading your institutions...
                      </td>
                    </tr>
                  ) : filteredSchools.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="empty-state">
                        {search
                          ? "No schools match your search."
                          : "No schools registered yet. Add your first school above."}
                      </td>
                    </tr>
                  ) : (
                    filteredSchools.map((school, index) => (
                      <tr key={school.id}>
                        <td>
                          <div className="institution-cell">
                            <div
                              className={`institution-avatar avatar-${index % 4}`}
                            >
                              {school.name.charAt(0).toUpperCase()}
                            </div>

                            <div>
                              <strong>{school.name}</strong>
                              <small>Institution #{school.id}</small>
                            </div>
                          </div>
                        </td>

                        <td className="email-cell">{school.email}</td>

                        <td className="date-cell">
                          {school.created_at
                            ? new Date(
                                `${school.created_at.replace(" ", "T")}Z`,
                              ).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                                timeZone: "UTC",
                              })
                            : "—"}
                        </td>

                        <td>
                          <span className="status-badge">
                            <span /> Registered
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="table-footer">
              <span>
                Showing {loading ? 0 : filteredSchools.length} of{" "}
                {schools.length} institutions
              </span>

              <span className="table-footer-note">
                <span className="live-dot" />
                Synced with database
              </span>
            </div>
          </section>

          <footer className="page-footer">
            <span>© 2026 EduLedger</span>
            <span>Smarter school payments. Better possibilities.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;