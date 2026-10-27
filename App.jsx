import { useMemo, useState } from "react";

const initialMembers = [
  {
    id: 1,
    name: "Aarav Sharma",
    role: "Creative Thinker",
    location: "Bengaluru",
    interests: ["Technology", "Music", "Photography"],
    bio: "I enjoy exploring new ideas and capturing everyday moments.",
  },
  {
    id: 2,
    name: "Rohan Mehta",
    role: "Fitness Enthusiast",
    location: "Mandya",
    interests: ["Fitness", "Travel", "Technology"],
    bio: "Let's stay active, explore new places, and learn together.",
  },
  {
    id: 3,
    name: "Aditya Kumar",
    role: "Music Enthusiast",
    location: "Bengaluru",
    interests: ["Music", "Gaming", "Technology"],
    bio: "Music, games, and great conversations make my day.",
  },
  {
    id: 4,
    name: "Arjun Das",
    role: "Game Developer",
    location: "Mysuru",
    interests: ["Gaming", "Technology", "Design"],
    bio: "Interested in games, digital creativity, and innovation.",
  },
  {
    id: 5,
    name: "Vikram Singh",
    role: "Photographer",
    location: "Bengaluru",
    interests: ["Photography", "Travel", "Nature"],
    bio: "I love capturing beautiful moments and exploring places.",
  },
  {
    id: 6,
    name: "Priya Nair",
    role: "Book Lover",
    location: "Mandya",
    interests: ["Reading", "Writing", "Music"],
    bio: "Always looking for a good book and meaningful conversations.",
  },
  {
    id: 7,
    name: "Sneha Kulkarni",
    role: "Technology Explorer",
    location: "Mysuru",
    interests: ["Technology", "Coding", "Reading"],
    bio: "Curious about technology and learning something new every day.",
  },
  {
    id: 8,
    name: "Meera Iyer",
    role: "Creative Writer",
    location: "Bengaluru",
    interests: ["Writing", "Reading", "Art"],
    bio: "I love stories, creative writing, and exchanging ideas.",
  },
  {
    id: 9,
    name: "Nisha Gowda",
    role: "Creative Mind",
    location: "Mandya",
    interests: ["Art", "Writing", "Cooking"],
    bio: "I enjoy making things, learning skills, and meeting people.",
  },
  {
    id: 10,
    name: "Kiran Verma",
    role: "Fitness Explorer",
    location: "Mysuru",
    interests: ["Fitness", "Nature", "Travel"],
    bio: "Enjoying outdoor adventures and a healthy lifestyle.",
  },
  {
    id: 11,
    name: "Riya Fernandes",
    role: "Music Creator",
    location: "Goa",
    interests: ["Music", "Cooking", "Photography"],
    bio: "I love melodies, homemade food, and creative people.",
  },
  {
    id: 12,
    name: "Rahul Joshi",
    role: "Adventure Seeker",
    location: "Bengaluru",
    interests: ["Travel", "Photography", "Nature"],
    bio: "Always ready for a new adventure and new friendships.",
  },
  {
    id: 13,
    name: "Ananya Rao",
    role: "Design Enthusiast",
    location: "Mysuru",
    interests: ["Design", "Art", "Technology"],
    bio: "I enjoy creating things and exploring new design ideas.",
  },
  {
    id: 14,
    name: "Dev Patel",
    role: "Sports Lover",
    location: "Mandya",
    interests: ["Sports", "Fitness", "Gaming"],
    bio: "I enjoy sports, teamwork, and meeting new people.",
  },
  {
    id: 15,
    name: "Kavya Shetty",
    role: "Food Explorer",
    location: "Mangaluru",
    interests: ["Cooking", "Travel", "Photography"],
    bio: "Exploring different cuisines and sharing food experiences.",
  },
  {
    id: 16,
    name: "Siddharth Rao",
    role: "Coding Learner",
    location: "Bengaluru",
    interests: ["Coding", "Technology", "Gaming"],
    bio: "Learning new programming skills and building projects.",
  },
  {
    id: 17,
    name: "Pooja Reddy",
    role: "Nature Lover",
    location: "Mysuru",
    interests: ["Nature", "Reading", "Travel"],
    bio: "I find happiness in peaceful places and good books.",
  },
  {
    id: 18,
    name: "Manoj Kumar",
    role: "Movie Enthusiast",
    location: "Mandya",
    interests: ["Movies", "Music", "Gaming"],
    bio: "Let's discuss movies, music, and everything in between.",
  },
  {
    id: 19,
    name: "Divya Hegde",
    role: "Art Lover",
    location: "Bengaluru",
    interests: ["Art", "Photography", "Reading"],
    bio: "Finding inspiration in art, books, and everyday life.",
  },
  {
    id: 20,
    name: "Akash Gowda",
    role: "Travel Enthusiast",
    location: "Mysuru",
    interests: ["Travel", "Sports", "Nature"],
    bio: "Exploring new places and collecting unforgettable memories.",
  },
  {
    id: 21,
    name: "Ishita Sen",
    role: "Learning Enthusiast",
    location: "Bengaluru",
    interests: ["Reading", "Technology", "Writing"],
    bio: "I enjoy learning new things and sharing knowledge.",
  },
  {
    id: 22,
    name: "Varun Nair",
    role: "Design Explorer",
    location: "Mandya",
    interests: ["Design", "Gaming", "Art"],
    bio: "Interested in creativity, design, and digital experiences.",
  },
  {
    id: 23,
    name: "Neha Kapoor",
    role: "Music Lover",
    location: "Mysuru",
    interests: ["Music", "Travel", "Reading"],
    bio: "Good music and meaningful friendships make life better.",
  },
  {
    id: 24,
    name: "Pranav Shetty",
    role: "Sports Enthusiast",
    location: "Bengaluru",
    interests: ["Sports", "Technology", "Fitness"],
    bio: "I love teamwork, sports, and learning new skills.",
  },
];

const availableInterests = [
  "Technology",
  "Music",
  "Photography",
  "Fitness",
  "Travel",
  "Gaming",
  "Design",
  "Reading",
  "Writing",
  "Nature",
  "Art",
  "Cooking",
  "Coding",
  "Sports",
  "Movies",
];

function getCompatibility(myInterests, theirInterests) {
  if (!myInterests || myInterests.length === 0) {
    return 0;
  }

  const shared = myInterests.filter((interest) =>
    theirInterests.includes(interest)
  );

  return Math.round((shared.length / myInterests.length) * 100);
}

function getMatchExplanation(myProfile, member) {
  if (!myProfile || !member) {
    return {
      shared: [],
      explanation: "Create your profile to discover personalized matches.",
      suggestion: "Add your interests to get started.",
    };
  }

  const shared = myProfile.interests.filter((interest) =>
    member.interests.includes(interest)
  );

  if (shared.length === 0) {
    return {
      shared: [],
      explanation:
        `${member.name} has different interests from you. ` +
        "You could discover new hobbies by connecting.",
      suggestion: "Explore their profile to learn more.",
    };
  }

  return {
    shared,
    explanation:
      `You and ${member.name} both enjoy ${shared.join(", ")}. ` +
      "These shared interests could give you something interesting to discuss.",

    suggestion:
      `Start a conversation about ${shared[0]} and see what you have in common.`,
  };
}

export default function App() {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem("peopleconnect_members");
      return saved ? JSON.parse(saved) : initialMembers;
    } catch {
      return initialMembers;
    }
  });

  const [myProfile, setMyProfile] = useState(() => {
    try {
      const saved = localStorage.getItem("peopleconnect_my_profile");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [savedIds, setSavedIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("peopleconnect_saved") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [connectedIds, setConnectedIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("peopleconnect_connections") || "[]"
      );
    } catch {
      return [];
    }
  });

  const [page, setPage] = useState("discover");
  const [search, setSearch] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All interests");
  const [showProfile, setShowProfile] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [notice, setNotice] = useState("");

  const [profileName, setProfileName] = useState("");
  const [profileLocation, setProfileLocation] = useState("");
  const [profileRole, setProfileRole] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [profileInterests, setProfileInterests] = useState([]);

  function showMessage(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  function createProfile(event) {
    event.preventDefault();

    const name = profileName.trim();
    const city = profileLocation.trim();

    if (!name) {
      showMessage("Please enter your name.");
      return;
    }

    if (profileInterests.length === 0) {
      showMessage("Please select at least one interest.");
      return;
    }

    const newProfile = {
      id: myProfile?.id ?? Date.now(),
      name,
      role: profileRole.trim() || "Community Member",
      location: city || "Not specified",
      interests: profileInterests,
      bio: profileBio.trim() || "Ready to discover meaningful connections.",
    };

    const updatedMembers = [
      ...members.filter((member) => member.id !== newProfile.id),
      newProfile,
    ];

    setMembers(updatedMembers);
    setMyProfile(newProfile);

    localStorage.setItem(
      "peopleconnect_members",
      JSON.stringify(updatedMembers)
    );

    localStorage.setItem(
      "peopleconnect_my_profile",
      JSON.stringify(newProfile)
    );

    setShowProfile(false);
    setPage("discover");
    showMessage(`Welcome, ${name}! Your profile has been saved.`);
  }

  function toggleInterest(interest) {
    setProfileInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );
  }

  function toggleSaved(memberId) {
    const updated = savedIds.includes(memberId)
      ? savedIds.filter((id) => id !== memberId)
      : [...savedIds, memberId];

    setSavedIds(updated);
    localStorage.setItem("peopleconnect_saved", JSON.stringify(updated));

    showMessage(
      updated.includes(memberId)
        ? "Profile added to saved people."
        : "Profile removed from saved people."
    );
  }

  function toggleConnection(memberId) {
    const alreadyConnected = connectedIds.includes(memberId);

    const updated = alreadyConnected
      ? connectedIds.filter((id) => id !== memberId)
      : [...connectedIds, memberId];

    setConnectedIds(updated);

    localStorage.setItem(
      "peopleconnect_connections",
      JSON.stringify(updated)
    );

    showMessage(
      alreadyConnected
        ? "Connection request cancelled."
        : "Connection request sent!"
    );
  }

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return members
      .filter((member) => member.id !== myProfile?.id)
      .filter((member) => {
        const searchableText = [
          member.name,
          member.role,
          member.location,
          member.bio,
          ...member.interests,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .filter((member) => {
        return (
          selectedInterest === "All interests" ||
          member.interests.includes(selectedInterest)
        );
      })
      .filter((member) => {
        return page !== "saved" || savedIds.includes(member.id);
      })
      .sort((a, b) => {
        if (!myProfile) return 0;

        return (
          getCompatibility(myProfile.interests, b.interests) -
          getCompatibility(myProfile.interests, a.interests)
        );
      });
  }, [members, myProfile, search, selectedInterest, page, savedIds]);

  function editMyProfile() {
    if (myProfile) {
      setProfileName(myProfile.name);
      setProfileLocation(myProfile.location);
      setProfileRole(myProfile.role);
      setProfileBio(myProfile.bio);
      setProfileInterests(myProfile.interests);
    }

    setShowProfile(true);
  }

  return (
    <div className="app-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap');

        :root {
          font-family: 'DM Sans', sans-serif;
          color: #23352c;
          background: #f8f8f3;
          font-synthesis: none;
          text-rendering: optimizeLegibility;
        }

        * { box-sizing: border-box; }

        body {
          margin: 0;
          min-width: 320px;
          background: #f8f8f3;
        }

        button, input, textarea, select {
          font: inherit;
        }

        button { cursor: pointer; }

        .app-shell { min-height: 100vh; }

        .topbar {
          min-height: 76px;
          padding: 16px 6%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          border-bottom: 1px solid #e9e9df;
          background: rgba(255,255,255,.88);
          position: sticky;
          top: 0;
          z-index: 5;
        }

        .brand {
          border: none;
          background: transparent;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 20px;
          font-weight: 700;
          color: #263b30;
        }

        .brand-mark {
          width: 38px;
          height: 38px;
          display: grid;
          place-items: center;
          color: white;
          background: #344e41;
          border-radius: 13px;
          font-size: 25px;
        }

        .nav {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .nav-button, .secondary-button {
          background: transparent;
          border: 1px solid transparent;
          color: #5d6b62;
          border-radius: 24px;
          padding: 11px 16px;
        }

        .nav-button.active {
          background: #eef1e9;
          color: #263b30;
          font-weight: 700;
        }

        .primary-button, .connect-button {
          border: none;
          border-radius: 24px;
          padding: 12px 18px;
          background: #344e41;
          color: white;
          font-weight: 700;
        }

        .primary-button:hover, .connect-button:hover {
          background: #263b30;
        }

        .secondary-button {
          border-color: #e0e4dc;
          background: white;
        }

        .hero {
          padding: 72px 6% 54px;
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 36px;
          align-items: center;
          max-width: 1400px;
          margin: auto;
        }

        .eyebrow {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #667b6c;
        }

        h1, h2, h3, p { margin-top: 0; }

        .hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(42px, 6vw, 76px);
          line-height: 1.04;
          letter-spacing: -2px;
          margin: 18px 0;
          max-width: 720px;
        }

        .hero p {
          max-width: 570px;
          line-height: 1.8;
          color: #66746a;
          font-size: 16px;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 26px;
        }

        .hero-art {
          min-height: 300px;
          border-radius: 32px;
          background: #e9eee5;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .orbit {
          width: 210px;
          height: 210px;
          border: 1px solid #bfcdbf;
          border-radius: 50%;
          display: grid;
          place-items: center;
        }

        .orbit-center {
          width: 125px;
          height: 125px;
          border-radius: 50%;
          background: #344e41;
          color: white;
          display: grid;
          place-items: center;
          text-align: center;
          font-weight: 700;
          padding: 15px;
        }

        .bubble {
          position: absolute;
          background: white;
          padding: 12px 16px;
          border-radius: 16px;
          box-shadow: 0 8px 24px #263b3010;
          font-size: 13px;
        }

        .bubble.one { top: 25%; left: 8%; }
        .bubble.two { right: 8%; top: 37%; }
        .bubble.three { bottom: 16%; left: 18%; }

        .section {
          max-width: 1400px;
          padding: 28px 6% 70px;
          margin: auto;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 20px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .section-heading h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 36px;
          margin: 8px 0;
        }

        .section-heading p {
          color: #778178;
          margin-bottom: 0;
        }

        .filters {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 26px;
        }

        .search-input, .filter-select, .form-input, .form-textarea {
          background: white;
          border: 1px solid #e0e4dc;
          border-radius: 14px;
          padding: 13px 15px;
          color: #263b30;
          outline: none;
          width: 100%;
        }

        .search-input:focus, .filter-select:focus,
        .form-input:focus, .form-textarea:focus {
          border-color: #708b78;
          box-shadow: 0 0 0 3px #708b781a;
        }

        .search-input { flex: 1 1 250px; }
        .filter-select { flex: 0 1 220px; }

        .member-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .member-card {
          border: 1px solid #e8e9e1;
          background: white;
          border-radius: 22px;
          padding: 23px;
          display: flex;
          flex-direction: column;
          min-width: 0;
          transition: transform .2s, box-shadow .2s;
        }

        .member-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px #263b300c;
        }

        .member-top {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 16px;
        }

        .avatar {
          width: 54px;
          height: 54px;
          flex: 0 0 54px;
          border-radius: 18px;
          display: grid;
          place-items: center;
          color: #344e41;
          background: #e9eee5;
          font-weight: 700;
          font-size: 18px;
        }

        .member-top h3 { margin: 0 0 5px; font-size: 17px; }
        .member-role { color: #7a857b; font-size: 13px; }
        .match-badge {
          margin-left: auto;
          white-space: nowrap;
          background: #eef3e9;
          color: #47664e;
          border-radius: 18px;
          padding: 7px 10px;
          font-size: 12px;
          font-weight: 700;
        }

        .location {
          color: #6b7b6d;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .member-bio {
          color: #68756b;
          line-height: 1.65;
          font-size: 14px;
          min-height: 46px;
          margin-bottom: 16px;
        }

        .interest-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 20px;
        }

        .interest-chip {
          border-radius: 20px;
          background: #f4f5ef;
          color: #637365;
          padding: 7px 10px;
          font-size: 12px;
        }

        .card-actions {
          display: flex;
          gap: 9px;
          margin-top: auto;
        }

        .card-actions button { flex: 1; }
        .save-button {
          border: 1px solid #e0e4dc;
          background: white;
          color: #526356;
          border-radius: 24px;
          padding: 11px;
        }

        .empty-state {
          background: white;
          border: 1px dashed #d6ddd3;
          padding: 48px 20px;
          text-align: center;
          border-radius: 22px;
          color: #718075;
          grid-column: 1 / -1;
        }

        .profile-panel {
          max-width: 750px;
          margin: 35px auto;
          background: white;
          padding: 32px;
          border-radius: 24px;
          border: 1px solid #e8e9e1;
        }

        .profile-panel h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
        }

        .profile-details {
          display: grid;
          gap: 15px;
          margin: 22px 0;
        }

        .profile-details div {
          padding: 15px;
          border-radius: 14px;
          background:#f7f8f3;
      }

          .profile-details strong {
          display: block;
          margin-bottom: 6px;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: #14241bc2;
          display: grid;
          place-items: center;
          padding: 18px;
          z-index: 20;
          overflow-y: auto;
        }

        .modal {
          width: min(100%, 500px);
          max-height: 92vh;
          overflow-y: auto;
          background: white;
          padding: 28px;
          border-radius: 24px;
          box-shadow: 0 20px 80px #0002;
        }

        .modal h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 32px;
          margin: 8px 0 12px;
        }

        .modal-description {
          color: #778178;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .form-label {
          display: block;
          margin: 16px 0 8px;
          font-size: 13px;
          font-weight: 700;
        }

        .form-textarea {
          min-height: 85px;
          resize: vertical;
        }

        .interest-picker {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 10px;
        }

        .interest-option {
          border: 1px solid #e0e4dc;
          border-radius: 20px;
          padding: 8px 12px;
          background: white;
          color: #66746a;
          font-size: 12px;
        }

        .interest-option.selected {
          background: #344e41;
          color: white;
          border-color: #344e41;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 24px;
        }

        .notice {
          position: fixed;
          z-index: 30;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          background: #344e41;
          color: white;
          padding: 14px 20px;
          border-radius: 14px;
          box-shadow: 0 8px 30px #0002;
          max-width: calc(100% - 30px);
          font-size: 14px;
          text-align: center;
        }

        footer {
          border-top: 1px solid #e9e9df;
          padding: 25px 6%;
          color: #7a857b;
          font-size: 13px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
        }

        @media (max-width: 950px) {
          .member-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .hero { grid-template-columns: 1fr; padding-top: 48px; }
          .hero-art { min-height: 260px; }
        }

        @media (max-width: 620px) {
          .topbar { padding: 14px 4%; align-items: flex-start; flex-direction: column; }
          .nav { width: 100%; gap: 4px; }
          .nav-button { padding: 9px 11px; }
          .hero { padding: 42px 5% 30px; }
          .hero h1 { letter-spacing: -1px; }
          .section { padding: 24px 5% 45px; }
          .section-heading h2 { font-size: 30px; }
          .member-grid { grid-template-columns: 1fr; }
          .profile-panel { padding: 22px; margin: 20px 5%; }
          .modal { padding: 22px; }
          .bubble.one { left: 3%; }
          .bubble.two { right: 3%; }
        }
      `}</style>

      <header className="topbar">
        <button
          className="brand"
          onClick={() => setPage("discover")}
          aria-label="PeopleConnect AI home"
        >
          <span className="brand-mark">✳</span>
          PeopleConnect AI
        </button>

        <nav className="nav">
          <button
            className={`nav-button ${page === "discover" ? "active" : ""}`}
            onClick={() => setPage("discover")}
          >
            Discover
          </button>

          <button
            className={`nav-button ${page === "saved" ? "active" : ""}`}
            onClick={() => setPage("saved")}
          >
            Saved ({savedIds.length})
          </button>

          <button
            className={`nav-button ${page === "profile" ? "active" : ""}`}
            onClick={() => setPage("profile")}
          >
            My profile
          </button>

          <button className="primary-button" onClick={editMyProfile}>
            {myProfile ? "Edit profile" : "Create profile"} →
          </button>
        </nav>
      </header>

      {page === "discover" && (
        <>
          <section className="hero">
            <div>
              <div className="eyebrow">✦ Connections that matter</div>

              <h1>Your people are out there.</h1>

              <p>
                Discover people who share your passions, understand your
                interests, and inspire you to grow. Find meaningful
                connections beyond the usual scroll.
              </p>

              <div className="hero-actions">
                <button
                  className="primary-button"
                  onClick={() =>
                    document
                      .getElementById("discover-people")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Discover your people →
                </button>

                <button
                  className="secondary-button"
                  onClick={() => setPage("saved")}
                >
                  Explore saved people
                </button>
              </div>

              <p style={{ fontSize: 12, marginTop: 22 }}>
                ✦ Shared interests. Genuine friendship. Better communities.
              </p>
            </div>

            <div className="hero-art">
              <div className="orbit">
                <div className="orbit-center">
                  ✳
                  <br />
                  Find your kind of people
                </div>
              </div>

              <div className="bubble one">👋 {myProfile?.name || "You"}</div>
              <div className="bubble two">✦ Shared interests</div>
              <div className="bubble three">💚 Meaningful connections</div>
            </div>
          </section>

          <main className="section" id="discover-people">
            <div className="section-heading">
              <div>
                <div className="eyebrow">Find your community</div>
                <h2>People worth knowing</h2>
                <p>
                  {myProfile
                    ? "Your shared interests help us find people you may connect with."
                    : "Explore the community and create a profile for personalised matches."}
                </p>
              </div>
            </div>

            <div className="filters">
              <input
                className="search-input"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search people, interests, or locations..."
                aria-label="Search people"
              />

              <select
                className="filter-select"
                value={selectedInterest}
                onChange={(event) => setSelectedInterest(event.target.value)}
                aria-label="Filter by interest"
              >
                <option>All interests</option>
                {availableInterests.map((interest) => (
                  <option key={interest}>{interest}</option>
                ))}
              </select>
            </div>

            <div className="member-grid">
              {filteredMembers.map((member) => {
                const match = myProfile
                  ? getCompatibility(myProfile.interests, member.interests)
                  : 0;

                const isSaved = savedIds.includes(member.id);
                const isConnected = connectedIds.includes(member.id);

                return (
                  <article className="member-card" key={member.id}>
                    <div
                      role="button"
                      tabIndex={0}
                      className="member-top"
                      style={{ cursor: "pointer" }}
                      onClick={() => setSelectedMember(member)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          setSelectedMember(member);
                        }
                      }}
                    >
                      <div className="avatar">
                        {member.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <h3>{member.name}</h3>
                        <div className="member-role">{member.role}</div>
                      </div>

                      {myProfile && (
                        <span className="match-badge">{match}% match</span>
                      )}
                    </div>

                    <div className="location">⌖ {member.location}</div>

                    <p className="member-bio">{member.bio}</p>

                    <div className="interest-list">
                      {member.interests.map((interest) => (
                        <span className="interest-chip" key={interest}>
                          {interest}
                        </span>
                      ))}
                    </div>

                    <div className="card-actions">
                      <button
                        className="connect-button"
                        onClick={() => toggleConnection(member.id)}
                      >
                        {isConnected ? "✓ Request sent" : "Connect →"}
                      </button>

                      <button
                        className="save-button"
                        onClick={() => toggleSaved(member.id)}
                      >
                        {isSaved ? "♥ Saved" : "♡ Save"}
                      </button>
                    </div>

                    <button
                      className="secondary-button"
                      style={{ marginTop: 10 }}
                      onClick={() => setSelectedMember(member)}
                    >
                      View profile
                    </button>
                  </article>
                );
              })}

              {filteredMembers.length === 0 && (
                <div className="empty-state">
                  <h3>No people found</h3>
                  <p>Try another search or select a different interest.</p>
                  <button
                    className="secondary-button"
                    onClick={() => {
                      setSearch("");
                      setSelectedInterest("All interests");
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {page === "saved" && (
        <main className="section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">Your collection</div>
              <h2>Saved people</h2>
              <p>Profiles you saved to revisit later.</p>
            </div>
          </div>

          <div className="filters">
            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search your saved people..."
            />

            <select
              className="filter-select"
              value={selectedInterest}
              onChange={(event) => setSelectedInterest(event.target.value)}
            >
              <option>All interests</option>
              {availableInterests.map((interest) => (
                <option key={interest}>{interest}</option>
              ))}
            </select>
          </div>

          <div className="member-grid">
            {filteredMembers.map((member) => (
              <article className="member-card" key={member.id}>
                <div className="member-top">
                  <div className="avatar">
                    {member.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <h3>{member.name}</h3>
                    <div className="member-role">{member.role}</div>
                  </div>
                </div>

                <div className="location">⌖ {member.location}</div>
                <p className="member-bio">{member.bio}</p>

                <div className="interest-list">
                  {member.interests.map((interest) => (
                    <span className="interest-chip" key={interest}>
                      {interest}
                    </span>
                  ))}
                </div>

                <div className="card-actions">
                  <button
                    className="connect-button"
                    onClick={() => toggleConnection(member.id)}
                  >
                    {connectedIds.includes(member.id)
                      ? "✓ Request sent"
                      : "Connect →"}
                  </button>

                  <button
                    className="save-button"
                    onClick={() => toggleSaved(member.id)}
                  >
                    ♥ Remove
                  </button>
                </div>
              </article>
            ))}

            {filteredMembers.length === 0 && (
              <div className="empty-state">
                <h3>No saved people yet</h3>
                <p>Go to Discover and save profiles you like.</p>
                <button
                  className="primary-button"
                  onClick={() => setPage("discover")}
                >
                  Discover people →
                </button>
              </div>
            )}
          </div>
        </main>
      )}

      {page === "profile" && (
        <main className="section">
          <div className="profile-panel">
            <div className="eyebrow">Your space</div>
            <h2>My profile</h2>

            {myProfile ? (
              <>
                <div className="member-top">
                  <div className="avatar">
                    {myProfile.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <div>
                    <h3>{myProfile.name}</h3>
                    <div className="member-role">{myProfile.role}</div>
                  </div>
                </div>

                <div className="profile-details">
                  <div>
                    <strong>Your city</strong>
                    {myProfile.location}
                  </div>

                  <div>
                    <strong>About you</strong>
                    {myProfile.bio}
                  </div>

                  <div>
                    <strong>Your interests</strong>
                    <div className="interest-list" style={{ marginTop: 12 }}>
                      {myProfile.interests.map((interest) => (
                        <span className="interest-chip" key={interest}>
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <strong>Connection requests</strong>
                    {connectedIds.length}
                  </div>
                </div>

                <button className="primary-button" onClick={editMyProfile}>
                  Edit my profile →
                </button>
              </>
            ) : (
              <>
                <p>
                  You haven't created your profile yet. Tell people about
                  yourself and discover others with similar interests.
                </p>

                <button className="primary-button" onClick={editMyProfile}>
                  Create my profile →
                </button>
              </>
            )}
          </div>
        </main>
      )}

      {showProfile && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowProfile(false);
            }
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="profile-heading"
          >
            <div className="eyebrow">Your space</div>
            <h2 id="profile-heading">
              {myProfile ? "Edit your profile" : "Create your profile"}
            </h2>

            <p className="modal-description">
              Introduce yourself and discover people with shared interests.
              Your profile is saved in this browser.
            </p>

            <form onSubmit={createProfile}>
              <label className="form-label" htmlFor="profile-name">
                Your name *
              </label>

              <input
                className="form-input"
                id="profile-name"
                value={profileName}
                onChange={(event) => setProfileName(event.target.value)}
                placeholder="Enter your name"
                required
              />

              <label className="form-label" htmlFor="profile-location">
                Your city
              </label>

              <input
                className="form-input"
                id="profile-location"
                value={profileLocation}
                onChange={(event) => setProfileLocation(event.target.value)}
                placeholder="Enter your city"
              />

              <label className="form-label" htmlFor="profile-role">
                Your role
              </label>

              <input
                className="form-input"
                id="profile-role"
                value={profileRole}
                onChange={(event) => setProfileRole(event.target.value)}
                placeholder="Example: Student, Designer, Music Lover"
              />

              <label className="form-label" htmlFor="profile-bio">
                About you
              </label>

              <textarea
                className="form-textarea"
                id="profile-bio"
                value={profileBio}
                onChange={(event) => setProfileBio(event.target.value)}
                placeholder="Tell people a little about yourself..."
              />

              <label className="form-label">Choose your interests *</label>

              <div className="interest-picker">
                {availableInterests.map((interest) => (
                  <button
                    type="button"
                    key={interest}
                    className={`interest-option ${
                      profileInterests.includes(interest) ? "selected" : ""
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {profileInterests.includes(interest) ? "✓ " : ""}
                    {interest}
                  </button>
                ))}
              </div>

              <p
                style={{
                  fontSize: 12,
                  color: "#778178",
                  marginTop: 10,
                  marginBottom: 0,
                }}
              >
                Selected: {profileInterests.length} interest(s)
              </p>
<div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowProfile(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  Save profile →
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

      {selectedMember && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedMember(null);
            }
          }}
        >
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="member-heading"
          >
            <div className="member-top">
              <div className="avatar">
                {selectedMember.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </div>

              <div>
                <h3 id="member-heading">{selectedMember.name}</h3>
                <div className="member-role">{selectedMember.role}</div>
              </div>
            </div>

            <div className="location">⌖ {selectedMember.location}</div>
            <p className="member-bio">{selectedMember.bio}</p>

            {myProfile && (
              <p>
                <strong>
                  {getCompatibility(
                    myProfile.interests,
                    selectedMember.interests
                  )}
                  % interest match
                </strong>
              </p>
            )}

            {myProfile && (() => {
  const match = getMatchExplanation(myProfile, selectedMember);
  const score = getCompatibility(
    myProfile.interests,
    selectedMember.interests
  );

  return (
    <div
      style={{
        background: "#eef3e9",
        padding: "18px",
        borderRadius: "16px",
        margin: "18px 0",
        lineHeight: 1.7,
      }}
    >
      <div
        style={{
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "1px",
          color: "#47664e",
        }}
      >
        YOUR COMPATIBILITY
      </div>

      <h2 style={{ margin: "8px 0", color: "#344e41" }}>
        {score}% Match
      </h2>

      <strong>Why this match?</strong>

      <p style={{ margin: "8px 0" }}>
        {match.explanation}
      </p>

      <strong>Shared interests</strong>

      <div className="interest-list" style={{ marginTop: "10px" }}>
        {match.shared.length > 0 ? (
          match.shared.map((interest) => (
            <span className="interest-chip" key={interest}>
              ✓ {interest}
            </span>
          ))
        ) : (
          <span>No shared interests yet</span>
        )}
      </div>

      <strong>Suggested conversation</strong>

      <p style={{ margin: "8px 0 0" }}>
        {match.suggestion}
      </p>
    </div>
  );
})()}

            <div className="interest-list">
              {selectedMember.interests.map((interest) => (
                <span className="interest-chip" key={interest}>
                  {interest}
                </span>
              ))}
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  toggleConnection(selectedMember.id);
                  setSelectedMember(null);
                }}
              >
                {connectedIds.includes(selectedMember.id)
                  ? "Cancel request"
                  : "Connect →"}
              </button>
            </div>
          </section>
        </div>
      )}

      {notice && <div className="notice">{notice}</div>}

      <footer>
        <span>✳ PeopleConnect AI — Connections that matter.</span>
        <span>Demo project · Building meaningful discovery</span>
      </footer>
    </div>
  );
}